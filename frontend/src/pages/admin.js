import React, { Component } from "react";
import request from "../utils/request";
import Addquestion from "../components/admin/addquestion";
import Stats from "../components/admin/stats";
import School from "../components/School";

class Admin extends Component {
  state = {
    viewedComponent: "AddQuestion"
  };

  checkIfAdmin() {
    request("get", "/isAdmin")
      .then(res => {
        if (!res.data.isAdmin) {
          return this.props.history.push("/");
        }
      })
      .catch(e => console.log(e));
  }

  componentDidMount() {
    this.checkIfAdmin();
  }

  renderComponent() {
    const { viewedComponent } = this.state;
    switch (viewedComponent) {
      case "AddQuestion":
        return (
          <div className="tap1">
            <Addquestion />
          </div>
        );
      case "userStats":
        return (
          <div className="tablestats">
            <Stats />
          </div>
        );
      case "schools":
        return <School />;
    }
  }

  render() {
    return (
      <div className="container">
        <ul className="horizontal-list">
          <li
            className="list-item"
            onClick={() => this.setState({ viewedComponent: "AddQuestion" })}
          >
            add a question
          </li>
          <li
            className="list-item"
            onClick={() => this.setState({ viewedComponent: "userStats" })}
          >
            user stats
          </li>
          <li
            className="list-item"
            onClick={() => this.setState({ viewedComponent: "schools" })}
          >
            schools
          </li>
        </ul>
        <div className="taps">{this.renderComponent()}</div>
      </div>
    );
  }
}

export default Admin;
