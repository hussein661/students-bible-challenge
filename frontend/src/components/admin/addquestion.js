import React, { Component } from "react";
import request from "../../utils/request";
import Feedback from "../feedback";
class addquestion extends Component {
  state = {
    question: {
      questionText: "",
      answers: [
        {
          answerText: "",
          answerScore: 0
        },
        {
          answerText: "",
          answerScore: 0
        },
        {
          answerText: "",
          answerScore: 0
        },
        {
          answerText: "",
          answerScore: 0
        }
      ]
    },
    message: ""
  };

  handleChange = (e, idx) => {
    const { name, value } = e.target;
    const question = { ...this.state.question };
    if (name === "questionText") {
      question.questionText = value;
    }
    if (name === "answerText") {
      question.answers[idx].answerText = value;
    }
    if (name === "answerScore") {
      question.answers[idx].answerScore = value;
    }
    this.setState({ question });
  };

  submitQuestion = e => {
    this.setState({ message: "" });
    const { question } = this.state;
    const url = "/question/addNew";
    request("post", url, { ...question })
      .then(r => {
        console.log({ r });
        if (r.response) {
          return this.setState({
            message: "you have already posted a question today"
          });
        }
        return this.setState({
          message: "the question published successfully"
        });
      })
      .catch(e => {
        console.log({ e });
        return this.setState({ message: e.message });
      });
  };

  feedback = () => {
    if (this.state.message) {
      return <Feedback message={this.state.message} />;
    }
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-9" style={{ margin: "0 auto" }}>
          <div className="form-group-admin">
            {this.feedback()}
            <label htmlFor="exampleFormControlInput1">Question</label>
            <textarea
              type="text"
              name="questionText"
              onChange={this.handleChange}
              className="form-control"
              placeholder="write question here"
            />
          </div>
          {/* <button className="btn btn-primary">Add Answers</button> */}
          <div className="form-group-admin answer-container">
            <label htmlFor="exampleFormControlTextarea1">Answer</label>
            {[1, 2, 3, 4].map((item, idx) => {
              return (
                <div key={item} className="answer-details">
                  <textarea
                    className="form-control question-field"
                    name="answerText"
                    placeholder={`Answer ${idx + 1}`}
                    rows={1}
                    onChange={e => this.handleChange(e, idx)}
                  />
                  <input 
                   type="number"
                   placeholder={`Score ${idx + 1}`}
                   rows={1}
                    name="answerScore"
                    className="form-control  score-field"
                    onChange={e => this.handleChange(e, idx)}
                  />
                </div>
              );
            })}
            <button className="btn btn-primary" onClick={this.submitQuestion}>
              submit question
            </button>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default addquestion;
