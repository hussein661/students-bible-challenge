import React, { Component } from "react";
import request from "../utils/request";
import Addquestion from "../components/admin/addquestion";
import Stats from "../components/admin/stats";

class Admin extends Component {
  state = {
    isQuestionView: true
  };

  changeView = e => {
    this.setState({ isQuestionView: !this.state.isQuestionView });
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

  render() {
    return (
      <div className="container">
        <ul className="horizontal-list">
          <li className="list-item" onClick={this.changeView}>
            add a question
          </li>
          <li className="list-item" onClick={this.changeView}>
            user stats
          </li>
        </ul>
        <div className="taps">
          {this.state.isQuestionView ? (
            <div className="tap1">
              <Addquestion />
            </div>
          ) : (
            <div className="tablestats">
              <Stats />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Admin;
