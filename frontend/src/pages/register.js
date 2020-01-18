import React, { Component } from "react";
import { Link } from "react-router-dom";
import request from "../utils/request";

class Register extends Component {
  state = {
    user: {
      name: "",
      email: "",
      password: "",
      school_id: "",
      level: ""
    },
    schools: [
      {
        id: 1,
        name: "akks"
      },
      {
        id: 2,
        name: "saggesse"
      }
    ],
    grades: [
      {
        name: 10,
        level: "Beginner"
      },
      {
        name: 11,
        level: "Intermediate"
      },
      {
        name: 12,
        level: "Advanced"
      }
    ]
  };

  handleChange = e => {
    var user = { ...this.state.user };
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };

  createUser = e => {
    e.preventDefault();
    request("post", "/users/register", {
      user: { ...this.state.user }
    })
      .then(r => {
        localStorage.setItem("API_TOKEN", r.data.token);
        this.props.history.push("/");
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 form-container">
            <form onSubmit={this.createUser}>
              <div className="form-group">
                <input
                  placeholder="Full Name"
                  type="name"
                  name="name"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  placeholder="Password"
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  placeholder="Confirm password"
                  type="password"
                  className="form-control"
                  // onChange={this.handleChange}
                  name="confirm_password"
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  name="school_id"
                  onChange={this.handleChange}
                >
                  {this.state.schools.map(school => {
                    return (
                      <option value={school.id} key={school.id}>
                        {school.name}
                      </option>
                    );
                  })}
                </select>
                <div className="form-group">
                  <select
                    className="form-control"
                    name="level"
                    onChange={this.handleChange}
                  >
                    {this.state.grades.map(grade => {
                      return (
                        <option value={grade.level} key={grade.grade}>
                          {grade.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <button type="submit" className="btn btn-primary">
                    create my account
                  </button>
                </div>
                <div>
                  <Link to="/login">
                    <a href="#">already have account</a>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
