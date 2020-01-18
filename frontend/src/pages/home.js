import React, { Component } from "react";
import request from "../utils/request";
import Feedback from "../components/feedback";

class Home extends Component {
  state = {
    question: {
      question: {},
      answers: [{}]
    },
    message: "",
    selectedAnswerId: null,
    answerScore: 0,
    user: { name: "" }
  };
  componentDidMount() {
    this.getUser();
    request("get", "/todayQuestion")
      .then(r => {
        if (!r.data.question) {
          return this.setState({
            message: "there is no question for today just yet"
          });
        }
        const question = r.data;
        this.setState({ question });
        request("post", "/isQuestionAnswered", {
          question_id: question.question._id
        })
          .then(r => {
            console.log(r);
            if (r.data === false) {
              return this.setState({
                message: "please select an answer for this question"
              });
            }
            this.setState({
              selectedAnswerId: r.data.answer_id,
              disabled: true,
              message: "You have successfully answered this question"
            });
          })
          .catch(e => {
            this.setState({ message: e.message });
          });
      })
      .catch(e => {
        this.setState({ message: e.message });
      });
  }

  getUser = () => {
    request("get", "/users/me").then(r => {
      this.setState({ user: r.data });
    });
  };

  handleSelectAnswer = (event, selectedAnswerId, answerScore) => {
    this.setState({ selectedAnswerId, answerScore: parseInt(answerScore) });
  };

  submitAnswer = e => {
    e.preventDefault();
    const question_id = this.state.question.question._id;
    const answer_id = this.state.selectedAnswerId;
    const answerScore = this.state.answerScore;
    request("post", "/user_answer_question", {
      question_id,
      answer_id,
      answerScore
    })
      .then(r => {
        this.setState({
          message: "Thank you, your answer submitted successfully"
        });
      })
      .catch(e => {
        alert();
        this.setState({ message: e.message });
      });
  };

  question = () => {
    const { question, selectedAnswerId } = this.state;
    if (!question.question.questionText) return <div></div>;
    return (
      <div className="question">
        <form
          style={{ width: "100%", margin: "0 auto" }}
          onSubmit={this.submitAnswer}
        >
          <h2 className="title">{question.question.questionText}</h2>
          <div className="choices">
            {question.answers.map(answer => {
              let isAnswerSelected = false;
              if (answer._id === selectedAnswerId) {
                isAnswerSelected = true;
              }
              return (
                <div
                  key={answer.id}
                  className="choice"
                  onClick={e =>
                    this.handleSelectAnswer(e, answer._id, answer.answerScore)
                  }
                >
                  <input
                    type="radio"
                    value={answer._id}
                    name={answer.answerText}
                    id={answer._id}
                  />
                  <label
                    for={answer.answerText}
                    style={{
                      background: isAnswerSelected ? "green" : "",
                      color: isAnswerSelected ? "green" : ""
                    }}
                  >
                    <span className="glyphicon glyphicon-ok"></span>
                    {answer.answerText}
                  </label>
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-primary pull-right"
            disabled={this.state.disabled}
          >
            Submit Answer
          </button>
        </form>
      </div>
    );
  };

  message = () => {
    const { message } = this.state;
    if (message) {
      return <Feedback message={message} />;
    }
  };

  render() {
    const { user } = this.state;
    return (
      <div>
        <div className="container">
          <div className="grid">
            <div className="left-side">
              {" "}
              <div className="header-2">
                <h2 className="title">welcome {user.name}</h2>
                <div className="level">Intermediate</div>
              </div>
            </div>

            <div className="content test">
              <div className="top">{this.message()}</div>
              <div className="question">{this.question()}</div>
            </div>
            <div className="right-side">right side</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
