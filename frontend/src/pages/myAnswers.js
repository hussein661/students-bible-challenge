import React, { Component } from "react";
import request from "../utils/request";
import moment from "moment";
import intl from "react-intl-universal";
class MyAnswers extends Component {
  state = {
    myanswers: [],
    loading: true
  };
  componentDidMount() {
    request("get", "/myanswers")
      .then(res => {
        console.log(res);
        this.setState({ myanswers: res.data.myanswers, loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.loading) {
      return <h1 className="text-center">loading...</h1>;
    }
    return (
      <div>
        <h1>{intl.get("MY_ANSWERS")}</h1>
        {this.state.myanswers.length && !this.state.loading ? (
          <div className="wrapper">
            <table className="table responsive table-hover">
              <tr className="thead">
                <td>{intl.get("QUESTION")}</td>
                <td>{intl.get("ANSWER")}</td>
                <td>{intl.get("CREATED_ON")}</td>
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
        ) : (
          <div className=" text-center">
            <h3>Your dont have any answeres yet</h3>
            <p>
              Go to 'Old Questions' or 'Today's question to start your challenge
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default MyAnswers;
