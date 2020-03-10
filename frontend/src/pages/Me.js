import React, { Component } from "react";
import request from "../utils/request";
import Feedback from "../components/feedback";
class Me extends Component {
  state = { user: { name: "", school_id: { name: "" } }, errorMessage: "" };
  componentDidMount() {
    this.getUser();
  }
  getUser = () => {
    request("get", "/users/me")
      .then(r => {
        this.setState({ user: r.data, loading: false, name: r.data.name });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };
  error = () => {
    if (this.state.errorMessage) {
      return <Feedback message={this.state.errorMessage} />;
    }
  };
  render() {
    return (
      <div className="container">
        <div className="me">
          <div className="col-md-8 form-container">
            <h1>Personal info</h1>
            <form onSubmit={this.onSubmit}>
              {this.error()}
              <div className="form-group">
                <label>Full name</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.user.name}
                  placeholder="name"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.user.email}
                  placeholder="name"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="text"
                  name="name"
                  placeholder="*******"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Your School </label>
                <input
                  type="text"
                  name="name"
                  placeholder="*******"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <div className="bt">
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Me;
