import React, {Component} from 'react'
import CSSModules from 'react-css-modules';
import styles from './Grid.scss';
import iconFacebook from '../assets/shareIcons/facebook.png';
import testImage from '../assets/image/test1.png';
import {connect} from 'dva';

class Grid extends Component {

  constructor(props) {
    super(props);
    this.fetchRepos = this.fetchRepos.bind(this)
  }

  static fetching({dispatch, path}) {
    let language = path.substr("/popular/".length);
    return [
      dispatch({type: 'grid/init', payload: {language}}),
    ];
  }

  componentDidMount() {
    if (this.props.list.length === 0) {
      this.fetchRepos(this.props.match.params.id)
    }
  }

  componentWillReceiveProps(nextProps) {
    const {match} = this.props;
    if (nextProps.match.params.id !== match.params.id) {
      this.fetchRepos(nextProps.match.params.id)
    }
  }

  fetchRepos(lang) {
    this.props.dispatch({
      type: 'grid/init',
      payload: {language: lang},
    });
  }

  render() {
    const {list, loading} = this.props;

    if (loading === true) {
      return <p>LOADING</p>
    }

    return (
      <div>
        <div>
          <img
            src={iconFacebook}
            alt="title"
            className={styles.icon}
          />
          <img src={testImage}/>
        </div>
        <ul style={{display: 'flex', flexWrap: 'wrap'}}>
          {list.map(({name, owner, stargazers_count, html_url}) => (
            <li key={name} style={{margin: 30}}>
              <ul className={styles.user}>
                <li><a href={html_url}>{name}</a></li>
                <li>@{owner.login}</li>
                <li>{stargazers_count} stars</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>

    )
  }
}

const mapStateToProps = state => {
  if (state.grid) {
    return {
      list: state.grid.list,
      loading: state.grid.loading,
    }
  } else {
    return {
      list: [],
      loading: false
    }
  }

};

export default connect(mapStateToProps)(CSSModules(Grid, styles));
