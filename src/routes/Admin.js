import React, {Component} from 'react'
import {connect} from "dva";
import cookie from 'js-cookie';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.handleClickLogout = this.handleClickLogout.bind(this)
  }

  handleClickLogout() {
    this.props.dispatch({
      type: 'user/logout',
    });
  }

  render() {
    return (
      <div>
        <h3>Admin Page</h3>
        <p>该页面需要登录才能查看</p>
        <p>您已经登录， AK为: {cookie.get("ak")}</p>
        <button onClick={this.handleClickLogout}>退出</button>
      </div>
    )
  }
}


Admin.propTypes = {};
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Admin);
