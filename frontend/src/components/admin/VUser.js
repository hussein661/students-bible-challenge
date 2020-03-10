import React, { Component } from "react";
import request from "../../utils/request";
import Feedback from "../feedback";
class VUser extends Component {
  state = { user: { name: "", school_id: { name: "" } }, errorMessage: "" };
  componentDidMount() {
    this.getUser();
  }
  getUser = () => {
    request("get", "/user/" + this.props.params.id)
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
                <label>{this.state.user.name}</label>
              </div>
              <div className="form-group">
                <label>{this.state.user.email}</label>
              </div>
              <div className="form-group">
                <label>Password</label>
              </div>
              <div className="form-group">
                <label>School </label>
              </div>
              <div className="bt">
                <button className="btn btn-success" type="submit">
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default VUser;
