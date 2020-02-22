import React, { Component } from "react";
import moment from "moment";
import request from "../../utils/request";
import {withRouter} from 'react-router-dom'
class QHistory extends Component {
  state = {
    questions: []
  };
  componentDidMount() {
    request("get", "/questions/all")
      .then(res => {
        this.setState({ questions: res.data });
      })
      .then(err => console.log(err));
  }


  render() {
    const { questions } = this.state;
    return (
      <div className="wrapper">
        <table className="table responsive table-hover">
          <tr className="thead">
            <td>question</td>
            <td>date</td>

          </tr>
          {questions.map(question => {
            return (
              <tr
                key={question.id}
                className="row-clickable"
                onClick={() =>
                  this.props.history.push(`/VQuestion/${question._id}`)
                }
              >
                <td>{question.questionText}</td>
                <td>{moment(question.createdAt).format("LLLL")}</td>

              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

export default withRouter(QHistory);
