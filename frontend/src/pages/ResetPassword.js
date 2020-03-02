import React, { Component } from "react";
import intl from "react-intl-universal";
import request from "../utils/request";
import Feedback from "../components/feedback";
class Login extends Component {
  state = {
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
    const { password } = this.state;
    const resetToken = this.props.params.resetToken;
    if (password.length) {
      request("post", "/resetPassword/" + resetToken, {
        password
      })
        .then(r => {
          this.setState({
            errorMessage: "password successfully changed"
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
            <h1>{intl.get("FORGOT_PASSWORd") || "reset password"}</h1>
            <form onSubmit={this.onSubmit}>
              {this.error()}
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="new pasword"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>

              <div>
                {this.state.errorMessage === "password successfully changed" ? (
                  <button
                    type="button"
                    onClick={() => this.props.history.push("/login")}
                  >
                    back to login
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    {intl.get("SEND") || "change my password"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
