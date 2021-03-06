import React, { Component } from "react";
import intl from "react-intl-universal";
import { Link } from "react-router-dom";
import request from "../utils/request";
import Feedback from "../components/feedback";
class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    this.state.loading = true;
    e.preventDefault();
    this.state.errorMessage = null;
    const { email } = this.state;
    if (email.length) {
      request("post", "/forgotpassword", {
        email,
        url: window.location
      })
        .then(r => {
          this.setState({
            errorMessage: "email successfully sent"
          });
        })
        .catch(e => {
          this.setState({
            errorMessage: "your email or password was incorrect"
          });
        });
    }
  };

  error = () => {
    if (this.state.errorMessage) {
      return <Feedback message={this.state.errorMessage} />;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 form-container">
            <h1>{intl.get("FORGOT_PASSWORd") || "forgot password"}</h1>
            <form onSubmit={this.onSubmit}>
              {this.error()}
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>

              <div>
                <button type="submit" className="btn btn-primary">
                  {intl.get("SEND") || "Send"}
                </button>
              </div>
              <div>
                <Link to="/forgotpassword">
                  {intl.get("CREATE_NEW_ACCOUNT") || "forgot password"}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
