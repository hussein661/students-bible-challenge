import React, { Component } from "react";
import request from "../utils/request";

class School extends Component {
  state = {
    name: "",
    schools: []
  };
  submit = () => {
    request("post", "/addSchool", { name: this.state.name }).then(res => {
      this.setState({
        schools: [...this.state.schools, { id: "", name: this.state.name }]
      });
      this.setState({ name: "" });
    });
  };
  componentDidMount() {
    request("get", "/getAllSchools").then(res => {
      this.setState({ schools: res.data.schools });
    });
  }

  removeSchool(id) {
    if (window.confirm("Are you sure ?")) {
      request("post", "/deleteSchool", { id }).then(res => {
        // alert("deleteing  " + id);
        const schools = this.state.schools.filter(school => school._id !== id);
        this.setState({ schools });
      });
    }
  }

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
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <ul>
              {this.state.schools.map(school => {
                return (
                  <li key={school._id}>
                    <div className="d-flex justify-content-between">
                      <div>{school.name}</div>
                      <a onClick={() => this.removeSchool(school._id)}>X</a>
                    </div>
                  </li>
                );
              })}
            </ul>
            <button onClick={this.submit}>Add school</button>
          </div>
        </div>
      </div>
    );
  }
}

export default School;
