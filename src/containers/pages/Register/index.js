import React, { Component } from "react";
import "./Register.scss";
import firebase from "../../../config/firebase";
import Button from "../../../components/atoms/Button";
import { connect } from "react-redux";
import { registerUserAPI } from "../../../config/redux/action";

class Register extends Component {
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

  handleRegisterSubmit = async () => {
    const { email, password } = this.state;
    const res = await this.props
      .registerAPI({ email, password })
      .catch((err) => err);
    if (res) {
      this.setState({
        email: "",
        password: "",
      });
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Register Page</p>
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
            onClick={this.handleRegisterSubmit}
            title="Register"
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
    registerAPI: (data) => dispatch(registerUserAPI(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
