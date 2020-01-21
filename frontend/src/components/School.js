import React, { Component } from "react";
import request from "../utils/request";

class School extends Component {
  state = {
    name: ""
  };
  submit = () => {
    request("post", "/addSchool", { name: this.state.name }).then(res => {
      console.log(res);
    });
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 form-container">
            <div className="form-group">
              <input
                placeholder="School Name"
                type="name"
                name="name"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            {/* <div className="form-group">
              <select
                placeholder="Education"
                type="name"
                name="name"
                className="form-control"
                onChange={this.handleChange}
              />
            </div> */}
            <button onClick={this.submit}>Add school</button>
          </div>
        </div>
      </div>
    );
  }
}

export default School;
