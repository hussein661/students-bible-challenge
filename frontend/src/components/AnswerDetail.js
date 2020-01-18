import React, { Component } from "react";

class AnswerDetail extends Component {
  render() {
    return (
      <div>
        <div className="form-group answer-container">
          <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
          <div className="answer-details">
            <textarea className="form-control" rows={3} />
            <textarea rows={3} className="form-group" />
          </div>
        </div>
      </div>
    );
  }
}

export default AnswerDetail;
