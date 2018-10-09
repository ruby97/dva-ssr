import React, {Component} from 'react';
import {connect} from 'dva';
import styles from './Home.css';
import CSSModules from 'react-css-modules';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        <div className={styles.welcome}/>
        <div>
          Select a Language
        </div>
      </div>
    );
  }
}

Home.propTypes = {};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(CSSModules(Home, styles));
