import React, { Component } from "react";
import "./question.css";
import axios from "axios";
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Single-Correct",
    };
    // this.paper = this.props.match.params.id;
    this.paper = "Data structures and Algorithms";
    this.marks = "1";
    this.difficulty = "Easy";
    this.question = "";
    console.log("from question.js");
    this.SingleCorrect = {
      a: "",
      b: "",
      c: "",
      d: "",
      ans: "1",
    };

    this.MultipleCorrect = {
      a: "",
      b: "",
      c: "",
      d: "",
      ans: {
        a: "false",
        b: "false",
        c: "false",
        d: "false",
      },
    };

    this.Numerical = {
      ans: "",
    };

    this.FormSubmit = this.FormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
    // console.log(this.MultipleCorrect)
  }

  FormSubmit(event) {
    event.preventDefault();
    if (this.state.value === "Single-Correct") {
      const userObject = {
        paper_name: this.paper,
        question: {
          question: this.question,
          marks: this.marks,
          difficulty: this.difficulty,
          questiontype: this.state.value,
          a: this.SingleCorrect.a,
          b: this.SingleCorrect.b,
          c: this.SingleCorrect.c,
          d: this.SingleCorrect.d,
          ans: this.SingleCorrect.ans,
        },
      };

      axios
        .post("http://localhost:5000/savequestion", userObject)
        .then((res) => {
          // console.log(res.data);
        });

      // restore values for next time
      this.marks = "1";
      this.difficulty = "Easy";
      this.question = "";

      this.SingleCorrect = {
        a: "",
        b: "",
        c: "",
        d: "",
        ans: "1",
      };
    }
    if (this.state.value === "Numerical") {
      const userObject = {
        paper_name: this.paper,
        question: {
          question: this.question,
          marks: this.marks,
          difficulty: this.difficulty,
          questiontype: this.state.value,
          ans: this.Numerical.ans,
        },
      };
      axios
        .post("http://localhost:5000/savequestion", userObject)
        .then((res) => {
          // console.log(res.data);
        });

      // restore values for next time
      this.marks = "1";
      this.difficulty = "Easy";
      this.question = "";

      this.Numerical = {
        ans: "",
      };
    }
    if (this.state.value === "Multiple-Correct") {
      const userObject = {
        paper_name: this.paper,
        question: {
          question: this.question,
          marks: this.marks,
          difficulty: this.difficulty,
          questiontype: this.state.value,
          a: this.MultipleCorrect.a,
          b: this.MultipleCorrect.b,
          c: this.MultipleCorrect.c,
          d: this.MultipleCorrect.d,
          ans: this.MultipleCorrect.ans,
        },
      };

      axios
        .post("http://localhost:5000/savequestion", userObject)
        .then((res) => {
          // console.log(res.data);
        });

      // restore values for next time
      this.marks = "1";
      this.difficulty = "Easy";
      this.question = "";

      this.MultipleCorrect = {
        a: "",
        b: "",
        c: "",
        d: "",
        ans: {
          a: "false",
          b: "false",
          c: "false",
          d: "false",
        },
      };
    }
    // document.getElementById("question-form").reset();
  }

  render() {
    return (
      <div>
        <div style={{ display: "inline-block", marginTop: 10 + "px" }}>
          <h1 align="center" style={{ marginBottom: 15 + "px" }}>
            {" "}
            Add Question
          </h1>
          <form onSubmit={this.FormSubmit} id="question-form">
            <div className="question-paramters">
              <div className="question-paramters-1">
                <label htmlFor="difficulty" style={{ marginRight: 40 + "px" }}>
                  Difficulty
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => (this.difficulty = e.target.value)}
                  name="difficulty-level"
                  id="difficulty"
                >
                  {/* {true && <option value="Easy">Easy1</option>} */}

                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <br />
              <div className="question-paramters-1">
                <label htmlFor="Marks" style={{ marginRight: 67 + "px" }}>
                  Marks
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => (this.marks = e.target.value)}
                  name="marks"
                  id="Marks"
                >
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <br />
              <div className="question-paramters-1">
                <label htmlFor="Question-type">Question-type</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={this.handleChange}
                  name="Question-type"
                  id="Question-type"
                >
                  <option value="Single-Correct">Single-Correct</option>
                  <option value="Multiple-Correct">Multiple-Correct</option>
                  <option value="Numerical">Numerical</option>
                </select>
              </div>
              <br />
            </div>
            <div className="question1">
              <label htmlFor="question" style={{ marginRight: 45 + "px" }}>
                Question
              </label>
              <textarea
                name="Question"
                id="questionid"
                onChange={(e) => (this.question = e.target.value)}
                cols="60"
                rows="3"
              ></textarea>
            </div>
            {this.state.value === "Single-Correct" && (
              <div className="answers">
                <br />
                <div id="single-correct">
                  <label htmlFor="option-a" style={{ marginRight: 45 + "px" }}>
                    Option-A
                  </label>
                  <textarea
                    name="Option-A"
                    id="single-correct-option-a"
                    onChange={(e) => (this.SingleCorrect.a = e.target.value)}
                    cols="60"
                    rows="1"
                    className="SingleCorrectOptions"
                  ></textarea>
                  <br />
                  <label htmlFor="option-b" style={{ marginRight: 45 + "px" }}>
                    Option-B
                  </label>
                  <textarea
                    name="Option-B"
                    id="single-correct-option-b"
                    onChange={(e) => (this.SingleCorrect.b = e.target.value)}
                    cols="60"
                    rows="1"
                    className="SingleCorrectOptions"
                  ></textarea>
                  <br />
                  <label htmlFor="option-c" style={{ marginRight: 45 + "px" }}>
                    Option-C
                  </label>
                  <textarea
                    name="Option-C"
                    id="single-correct-option-c"
                    onChange={(e) => (this.SingleCorrect.c = e.target.value)}
                    cols="60"
                    rows="1"
                    className="SingleCorrectOptions"
                  ></textarea>
                  <br />

                  <label htmlFor="option-d" style={{ marginRight: 45 + "px" }}>
                    Option-D
                  </label>
                  <textarea
                    name="Option-D"
                    id="single-correct-option-d"
                    onChange={(e) => (this.SingleCorrect.d = e.target.value)}
                    cols="60"
                    rows="1"
                    className="SingleCorrectOptions"
                  ></textarea>
                  <br />
                  <label htmlFor="answer">Answer</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => (this.SingleCorrect.ans = e.target.value)}
                    id="single-correct-answer"
                  >
                    <option value="1">Option A</option>
                    <option value="2">Option B</option>
                    <option value="3">Option C</option>
                    <option value="4">Option D</option>
                  </select>
                  <br />
                </div>
              </div>
            )}
            {this.state.value === "Multiple-Correct" && (
              <div id="multiple-correct" style={{ marginTop: 20 + "px" }}>
                <label
                  htmlFor="multiple-correct-option-a"
                  style={{ marginRight: 34 + "px" }}
                >
                  Option-A
                </label>
                <textarea
                  name="multiple-correct-Option-A"
                  onChange={(e) => (this.MultipleCorrect.a = e.target.value)}
                  id="multiple-correct-option-a"
                  cols="60"
                  rows="1"
                  className="MultipleCorrectOptions"
                ></textarea>
                <br />
                <label
                  htmlFor="multiple-correct-option-b"
                  style={{ marginRight: 34 + "px" }}
                >
                  Option-B
                </label>
                <textarea
                  name="multiple-correct-Option-B"
                  onChange={(e) => (this.MultipleCorrect.b = e.target.value)}
                  id="multiple-correct-option-b"
                  cols="60"
                  rows="1"
                  className="MultipleCorrectOptions"
                ></textarea>
                <br />
                <label
                  htmlFor="multiple-correct-option-c"
                  style={{ marginRight: 34 + "px" }}
                >
                  Option-C
                </label>
                <textarea
                  name="multiple-correct-Option-C"
                  onChange={(e) => (this.MultipleCorrect.c = e.target.value)}
                  id="multiple-correct-option-c"
                  cols="60"
                  rows="1"
                  className="MultipleCorrectOptions"
                ></textarea>
                <br />

                <label
                  htmlFor="multiple-correct-option-d"
                  style={{ marginRight: 34 + "px" }}
                >
                  Option-D
                </label>
                <textarea
                  name="multiple-correct-Option-D"
                  onChange={(e) => (this.MultipleCorrect.d = e.target.value)}
                  id="multiple-correct-option-d"
                  cols="60"
                  rows="1"
                  className="MultipleCorrectOptions"
                ></textarea>
                <br />
                <div className="form-check">
                  <input
                    className="form-check-input"
                    onChange={(e) =>
                      (this.MultipleCorrect.ans.a = e.target.value)
                    }
                    type="checkbox"
                    value="true"
                    id="op1"
                  />
                  <label className="form-check-label" htmlFor="op1">
                    Option-A
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    onChange={(e) =>
                      (this.MultipleCorrect.ans.b = e.target.value)
                    }
                    type="checkbox"
                    value="true"
                    id="op2"
                  />
                  <label className="form-check-label" htmlFor="op2">
                    Option-B
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    onChange={(e) =>
                      (this.MultipleCorrect.ans.c = e.target.value)
                    }
                    type="checkbox"
                    value="true"
                    id="op3"
                  />
                  <label className="form-check-label" htmlFor="op3">
                    Option-C
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    onChange={(e) =>
                      (this.MultipleCorrect.ans.d = e.target.value)
                    }
                    type="checkbox"
                    value="true"
                    id="op4"
                  />
                  <label className="form-check-label" htmlFor="op4">
                    Option-D
                  </label>
                </div>
              </div>
            )}

            {this.state.value === "Numerical" && (
              <div id="numericals" style={{ marginTop: 20 + "px" }}>
                <label htmlFor="numerical-ans">Answer</label>
                <textarea
                  name="numerical-Answer"
                  onChange={(e) => (this.Numerical.ans = e.target.value)}
                  id="numerical-ans"
                  cols="20"
                  rows="1"
                ></textarea>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-info btn-block btn-round"
              style={{
                display: "table-cell",
                width: 100 + "px",
                fontSize: 20 + "px",
                marginTop: 10 + "px",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Question;
