import React, { Component } from "react";
import DisplayQuestion from "./displayQuestion";
import { Redirect } from "react-router-dom";
import "./Put_question.css";
class DisplayPaper extends Component {
  constructor(props) {
    super(props);
    this.FormSubmit = this.FormSubmit.bind(this);
    this.analysis = {};
  }
  state = {
    paper: this.props.location.state.paper,
    analysis: this.props.location.state.analysis,
    answer: "",
    flag: false,
  };

  handleChange(e) {
    this.setState({ answer: e.target.value });
  }

  FormSubmit(event) {
    event.preventDefault();
    this.setState({ flag: true });
  }

  render() {
    return this.state.flag == true ? (
      <Redirect
        to={{
          pathname: "/analysis",
          state: { analysis: this.state.analysis },
        }}
      />
    ) : (
      <>
        <div style={{ display: "flex" }}>
          <div>
            <h1>{this.props.location.state.subject}</h1>
          </div>
          <div style={{ margin: "30px", marginLeft: "100px", display: "flex" }}>
            <form onSubmit={this.FormSubmit}>
              <button
                style={{ height: "27px", width: "100px", fontSize: "14px" }}
              >
                Analysis{" "}
              </button>
            </form>
            <a href="/">
              <button
                style={{
                  height: "27px",
                  width: "100px",
                  fontSize: "14px",
                  marginLeft: "800px",
                }}
              >
                back
              </button>
            </a>
          </div>
        </div>
        <div style={{ padding: "10px" }}>
          {this.state.paper.map((e) => {
            return <DisplayQuestion Question={e} />;
          })}
        </div>
      </>
    );
  }
}

export default DisplayPaper;
