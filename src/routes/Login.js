import React, {Component} from 'react'
import {connect} from 'dva';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeMobile = this.handleChangeMobile.bind(this);
    this.handleChangeCaptcha = this.handleChangeCaptcha.bind(this);

    this.state = {
      mobile: "",
      captcha: "",
    }
  }

  static fetching({dispatch, path}) {
    return [];
  }

  componentDidMount() {
  }

  userLogin(params) {
    this.props.dispatch({
      type: 'user/login',
      payload: params,
    });
  }

  handleSubmit() {
    let params = {
      mobile: this.state.mobile,
      captcha: this.state.captcha,
    };
    this.userLogin(params);
  };

  handleChangeMobile(e) {
    this.setState({mobile: e.target.value});
  }

  handleChangeCaptcha(e) {
    this.setState({captcha: e.target.value});
  }

  render() {
    const {mobile, captcha} = this.state;
    const {error} = this.props.user;
    return (
      <div>
        <div>
          {error ? (
            <div style={{color: "#FF0000"}}>
              登录失败 : {error}
            </div>
          ) : null}
          <div className="login-form">
            <div className={"form-input"}>
              <span>手机：</span>
              <input type={"text"}
                     placeholder={"请输入手机号"}
                     onChange={this.handleChangeMobile}
                     value={mobile}
              />
            </div>
            <div className={"form-input"}>
              <span>验证码：</span>
              <input type="text"
                     placeholder={"请输入验证码"}
                     onChange={this.handleChangeCaptcha}
                     value={captcha}
              />
            </div>
            <div>
              <button onClick={this.handleSubmit}>登录</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Login);
