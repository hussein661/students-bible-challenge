import React, { Component } from "react";
import request from "../utils/request";
import Feedback from "../components/feedback";
import intl from "react-intl-universal";

class Home extends Component {
  state = {
    question: {
      question: {},
      answers: [{}]
    },
    message: "",
    selectedAnswerId: null,
    answerScore: 0,
    user: { name: "", school_id: { name: "" } },
    answersCount: 0,
    questionsCount: 0
  };
  componentDidMount() {
    this.getUser();
    this.getCounts();
    request("get", "/todayQuestion")
      .then(r => {
        if (!r.data.question) {
          return this.setState({
            message: intl.get("THERE_IS_NO_QUESTION")
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
                message: intl.get("PLEASE_SELECT")
              });
            }
            this.setState({
              selectedAnswerId: r.data.answer_id,
              disabled: true,
              message: intl.get("ANSWERED_SUCCESSFULLY")
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
      setTimeout(this.setState({ user: r.data }), 1000);
    });
  };

  handleSelectAnswer = (event, selectedAnswerId, answerScore) => {
    this.setState({ selectedAnswerId, answerScore: parseInt(answerScore) });
  };

  getCounts() {
    request("get", "/answerStats")
      .then(res => {
        const { answersCount, questionsCount } = res.data;
        this.setState({ answersCount, questionsCount });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

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
          message: intl.get("THANKS_FOR_ANSWER")
        });
      })
      .catch(e => {
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
            {intl.get("SUBMIT_ANSWER") || "Submit Answer"}
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
    return (
      <div>
        <div className="container">
          <div className="grid">
            <div className="left-side">
              <div className="header-2">
                <h2>{intl.get("MY_PROFILE") || "My profile"}</h2>
                <p>
                  {intl.get("NAME")} : {this.state.user.name}
                </p>
                <p>{intl.get("LEVEL") || "Level"}: beginner</p>
                <p>
                  {intl.get("ANSWERED_QUESTIONS")} : {this.state.answersCount}{" "}
                  out of {this.state.questionsCount}
                </p>
                {/* <span>you have questions you didnt answer yet</span> */}
                {/* <p>School : {this.state.user.school_id.name}</p> */}
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
