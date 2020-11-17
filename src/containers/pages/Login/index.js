import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/atoms/Button";
import { loginUserAPI } from "../../../config/redux/action";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    // console.log(e.target.id);
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleLoginSubmit = async () => {
    const { email, password } = this.state;
    const { history } = this.props;
    const res = await this.props
      .loginAPI({ email, password })
      .catch((err) => err);
    if (res) {
      console.log("Login Success");
      localStorage.setItem("userData", JSON.stringify(res));
      setTimeout(() => {
        this.setState({
          email: "",
          password: "",
        });
      }, 2500);
      history.push("/");
    } else {
      console.log("Login Failed");
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Login Page</p>
          <input
            className="input"
            placeholder="Email"
            type="email"
            id="email"
            value={this.state.email}
            onChange={this.handleChangeText}
          />
          <input
            className="input"
            placeholder="Password"
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChangeText}
          />
          <Button
            onClick={this.handleLoginSubmit}
            title="Login"
            loading={this.props.isLoading}
          />
        </div>
        {/* <button>Go to Dashboard</button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAPI: (data) => dispatch(loginUserAPI(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
