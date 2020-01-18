import React, { Component } from "react";

class Feedback extends Component {
  state = {
    show: true
  };
  //   componentDidMount() {
  //     setTimeout(() => {
  //       this.setState({ show: false });
  //     }, 3000);
  //   }

  render() {
    if (!this.state.show) return <div></div>;
    return (
      <div className="wrapper">
        <div className="feed-message">
          <h4>{this.props.message}</h4>;
        </div>
      </div>
    );
  }
}

export default Feedback;
