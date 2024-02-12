import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";

import { handleLoginAxios } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMsg: "",
    };
  }

  handleOnChangeInput = (event) => {
    if (event.target.id === "usernameInput") {
      this.setState({ username: event.target.value });
    } else {
      this.setState({ password: event.target.value });
    }
  };

  showHidePassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };

  handleLogin = async () => {
    this.setState({
      errMsg: "",
    });

    try {
      let data = await handleLoginAxios(
        this.state.username,
        this.state.password
      );

      if (data) {
        if (data.errCode !== 0) {
          this.setState({ errMsg: data.message });
        } else {
          this.props.userLoginSuccess(data.user);
          console.log("Login successfully");
        }
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data) {
          this.setState({
            errMsg: err.response.data.message,
          });
        }
      }
    }
  };

  // handleOnChangeUsername = (event) => {
  //   console.log(event);
  //   this.setState({ username: event.target.value });
  // };

  // handleOnChangePassword = (event) => {
  //   this.setState({ password: event.target.value });
  // };

  render() {
    // const { username, password, loginError } = this.state;
    // const { lang } = this.props;

    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <div className="col-12 login-title">Login</div>
            <div className="col-12 form-group login-input">
              <label htmlFor="usernameInput">Username</label>
              <input
                id="usernameInput"
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeInput(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label htmlFor="passwordInput">Password</label>
              <div className="custom-input-password">
                <input
                  id="passwordInput"
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangeInput(event)}
                />
                <div onClick={() => this.showHidePassword()}>
                  {this.state.isShowPassword ? (
                    <i className="fas fa-eye-slash"></i>
                  ) : (
                    <i className="fas fa-eye"></i>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMsg}
            </div>

            <div className="col-12">
              <button
                type="button"
                className="login-btn"
                onClick={() => this.handleLogin()}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password-title">
                Forgot your password
              </span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or Login with: </span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
