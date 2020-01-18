import React, { Component } from "react";
import request from "../utils/request";
import moment from "moment";
class MyAnswers extends Component {
  state = {
    myanswers: []
  };
  componentDidMount() {
    request("get", "/myanswers")
      .then(res => {
        console.log(res);
        this.setState({ myanswers: res.data.myanswers });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>my answrrs</h1>
        <div className="wrapper">
          <table className="table responsive table-hover">
            <tr className="thead">
              <td>question</td>
              <td>answer</td>
              <td>date</td>
            </tr>
            {this.state.myanswers.map(answer => {
              return (
                <tr>
                  <td>{answer.question}</td>
                  <td>{answer.answer}</td>
                  <td>{moment(answer.date).format("LLLL")}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}

export default MyAnswers;
