import React, { Component } from "react";
import { Link } from "react-router-dom";
import request from "../utils/request";
import Feedback from '../components/feedback.js'
import intl from 'react-intl-universal'
class Register extends Component {
  state = {
    user: {
      name: "",
      email: "",
      password: "",
      school_id: "",
      level: 1
    },
    schools: [],
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

  componentDidMount() {
    this.getSchools();
  }
  getSchools() {
    request("get", "/getAllSchools").then(res => {
      this.setState({ schools: res.data.schools });
      const user = {...this.state.user}
      user.school_id = res.data.schools[0]._id
      this.setState({user})
    });
  }

  createUser = e => {
    e.preventDefault();
    request("post", "/users/register", {
      user: { ...this.state.user }
    })
      .then(r => {
        if(r.response){
          this.setState({error:"Email or password is not valid"})
          return console.log(r.response)
        }
        localStorage.setItem("API_TOKEN", r.data.token);
        this.props.history.push("/");
      })
      .catch(e => {
        console.log(e.message)
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <Feedback message={this.state.error} />
          <div className="col-md-6 form-container">
            <form onSubmit={this.createUser}>
              <label className="form-label">{intl.get("FULL_NAME") || "Full name"}</label>
              <div className="form-group">

                <input
                  placeholder="Full Name"
                  type="name"
                  name="name"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <label className="form-label">{intl.get("EMAIL") || "Email"}</label>

              <div className="form-group">
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <label className="form-label">{intl.get("PASSWORD") || "Password"}</label>

              <div className="form-group">
                <input
                  placeholder="Password"
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>

              <label className="form-label">{intl.get("CONFIRM") || "Confirm password"}</label>
              <div className="form-group">

                <input
                  placeholder="Confirm password"
                  type="password"
                  className="form-control"
                  // onChange={this.handleChange}
                  name="confirm_password"
                />
              </div>
                <label className="form-label">{intl.get("SCHOOL") || "School"}</label>
              <div className="form-group">
                <select
                 style={{borderRadius:"20px"}}
                  className="form-control rounded-select"
                  name="school_id"
                  value={this.state.user.school_id}
                  onChange={this.handleChange}
                >
                  {this.state.schools.map(school => {
                    return (
                      <option value={school._id} key={school._id}>
                        {school.name}
                      </option>
                    );
                  })}
                </select>
                {/* <div className="form-group">
                  <select
                 style={{borderRadius:"20px"}}

                    className="form-control"
                    name="level"
                    value={this.state.user.level}
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
                </div> */}
                <div>
                  <button type="submit" className="btn btn-primary">
                   {intl.get("CREATE_MY_ACCOUNT") || "Create my account"} 
                  </button>
                </div>
                <div>
                  <Link to="/login">
                    <a href="#">{intl.get("ALREADY_HAVE_ACCOUNT") || "Already have account"}</a>
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
