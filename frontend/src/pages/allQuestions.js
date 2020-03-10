import React, { Component } from "react";
import request from "../utils/request";
import moment from "moment";
import intl from "react-intl-universal";
class AllQuestions extends Component {
  state = {
    questions: [],
    loading: true
  };
  componentDidMount() {
    request("get", "/questions/all")
      .then(res => {
        this.setState({ questions: res.data, loading: false });
      })
      .then(err => console.log(err), this.setState({ loading: false }));
  }

  render() {
    const { questions } = this.state;
    if (this.state.loading) return <h1 className="text-center">loading...</h1>;
    return (
      <div className="wrapper">
        <table className="table responsive table-hover">
          <tr className="thead">
            <td>{intl.get("QUESTION")}</td>
            <td>{intl.get("CREATED_ON")}</td>
          </tr>
          {questions.map(question => {
            return (
              <tr
                key={question.id}
                className="row-clickable"
                onClick={() =>
                  this.props.history.push(`/question/${question._id}`)
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

export default AllQuestions;
