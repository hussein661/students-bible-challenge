import React, { Component } from "react";
import request from "../../utils/request";
import Feedback from "../feedback";
import {withRouter} from 'react-router-dom'
class VQuestion extends Component {
  state = {
    question: { question: {} }
  };
  componentDidMount() {
    this.getQuestion();
  }

  getQuestion() {
    const question_id = this.props.params.question_id;
    request("get", `/question/${question_id}`)
      .then(r => {
        if (!r.data.question) {
          return this.setState({
            message: "question not found"
          });
        }
        const question = r.data;
        this.setState({ question });
      })
      .catch(e => {
        this.setState({ message: e.message });
      });
  }

  deleteQuestion=(e)=>{
      e.preventDefault()
      if(!window.confirm('Are you sure ?!!')){
          return
      }
      const question_id = this.props.params.question_id
    request("post","/deleteQuestion/"+question_id).then(res=>{
        this.props.history.push('/admin')
    }).catch(err=>{
        this.setState({message:"Something went wrong"})
    })
}

  question = () => {
    const { question, selectedAnswerId } = this.state;
    if (!question.question.questionText) return <div></div>;
    return (
      <div className="question">
        <form
          style={{ width: "100%", margin: "0 auto" }}
        >
          <h2 className="title">{question.question.questionText}</h2>
          <div className="choices">
            {question.answers.map(answer => {
              return (
                <div
                  key={answer.id}
                  className="choice"
                >
                  <input
                    type="radio"
                    value={answer._id}
                    name={answer.answerText}
                    id={answer._id}
                  />
                  <label
                    for={answer.answerText}
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
            onClick={this.deleteQuestion}
          >
            Delete Question
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
          {this.message()}
          <div className="content test col-md-9 col-md-offset-3">
            {this.question()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(VQuestion);
