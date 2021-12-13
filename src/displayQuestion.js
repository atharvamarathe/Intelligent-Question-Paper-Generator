import React, { Component } from "react";
import "./Put_question.css";
class DisplayQuestion extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <div style={{ display: "flex", marginTop: "14px" }}>
        <div id={"question".concat("this.props.number")}>
          {/* {console.log("rendering chi;d")} */}
          <div className="question">
            <div className="subquestion-metainfo">
              <h4>
                <p />
                <b style={{ color: "red" }}>Q </b>
                <p />
                <b> {this.props.Question.marks} Marks</b>
                <p />
                <b style={{ color: "darkgreen" }}>
                  {" Difficulty : "}
                  {this.props.Question.difficulty}
                </b>
              </h4>
            </div>
          </div>
        </div>
        <div className="subquestion">
          <p />
          <div className="questionDis">{this.props.Question.question}</div>
          <div className="form-check">
            <div style={{ display: "flex" }}>
              <input
                className="form-check-input"
                onChange={this.handleChange}
                checked={this.state.answer === "1"}
                value="1"
                type="radio"
                name="options"
                id="flexRadioDefault1"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                {this.props.Question.options[0]}
              </label>
            </div>
            <div style={{ display: "flex" }}>
              <input
                className="form-check-input"
                onChange={this.handleChange}
                checked={this.state.answer === "2"}
                value="2"
                type="radio"
                name="options"
                id="flexRadioDefault2"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                {this.props.Question.options[1]}
              </label>
            </div>
            <div style={{ display: "flex" }}>
              <input
                className="form-check-input"
                onChange={this.handleChange}
                checked={this.state.answer === "3"}
                value="3"
                type="radio"
                name="options"
                id="flexRadioDefault3"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault3">
                {this.props.Question.options[2]}
              </label>
            </div>
            <div style={{ display: "flex" }}>
              <input
                className="form-check-input"
                onChange={this.handleChange}
                checked={this.state.answer === "4"}
                value="4"
                type="radio"
                name="options"
                id="flexRadioDefault4"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault4">
                {this.props.Question.options[3]}
                {/* {console.log(this.state.answer + "hihiui")} */}
              </label>
            </div>
            {/*                                     
                                        <input type="radio" value="1" name="options" /> {this.props.question.a}
                                        <input type="radio" value="2" name="options" /> {this.props.question.b}
                                        <input type="radio" value="3" name="options" /> {this.props.question.c}
                                        <input type="radio" value="4" name="options" /> {this.props.question.d} */}
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayQuestion;
