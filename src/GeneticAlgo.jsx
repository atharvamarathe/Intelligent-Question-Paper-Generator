import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Algorithm from "./geneticAlgo";
import { Redirect } from "react-router-dom";
class GeneticAlgo extends Component {
  constructor() {
    super();
    this.algo = null;
    this.subject = null;
    this.testName = null;
    this.totalMarks = null;
    this.totalQuestions = null;
    this.paper = null;
    this.difficulty = 1;
    this.data = {};
    this.analysis = {};
    this.options = {};
    this.FormSubmit = this.FormSubmit.bind(this);
  }
  state = {
    chapnum: 0,
    flag: false,
  };
  FormSubmit(event) {
    this.setState({ flag: true });
    console.log("Inside FormSubmut");
    event.preventDefault();
    // return;
    console.log(this.subject);
    console.log(this.testName);
    console.log(this.totalMarks);
    console.log(this.totalQuestions);
    console.log(this.difficulty);
    this.algo = new Algorithm(
      this.subject,
      this.testName,
      this.totalMarks,
      this.totalQuestions,
      this.difficulty,
      50,
      1000,
      0.2
    );
    const questionPaper = this.algo.Analyse();
    this.analysis = this.algo.analysePaper;
    this.paper = questionPaper;
    let arr = [];
    for (let i = 0; i < this.algo.analyseFitness.length; i++) arr.push(i + 1);
    this.data = {
      labels: arr,
      datasets: [
        {
          label: "Iterations",
          data: this.algo.analyseFitness,
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    };

    this.options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    console.log(this.algo.analyseQuestionPaper(questionPaper));
    return;
    for (let i = 0; i < questionPaper.length; i++) {
      document.write(i + 1 + ") " + questionPaper[i].question + "<br>");
      document.write(
        "a)" +
          questionPaper[i].options[0] +
          "   " +
          "b)" +
          questionPaper[i].options[1] +
          "<br>"
      );
      document.write(
        "c)" +
          questionPaper[i].options[2] +
          "   " +
          "d)" +
          questionPaper[i].options[3] +
          "<br>"
      );
      document.write("<br>");
    }
  }

  render() {
    const marks = [
      {
        value: 1,
        label: <i style={{ color: "green" }}>very Easy</i>,
      },
      {
        value: 1.5,
        label: <i style={{ color: "darkgreen" }}>Easy</i>,
      },
      {
        value: 2,
        label: <i style={{ color: "darkorange" }}>Medium</i>,
      },
      {
        value: 2.5,
        label: <i style={{ color: "red" }}>Hard</i>,
      },
      {
        value: 3,
        label: <i style={{ color: "black" }}>Tough</i>,
      },
    ];
    function valuetext(value) {
      return `${value}`;
    }
    function valueLabelFormat(value) {
      return marks.findIndex((mark) => mark.value === value) + 1;
    }
    // <div style={{ height: "700px", width: "700px" }}>
    //     <br />
    //     <br />
    //     <Line data={this.data} options={this.options} />
    //   </div>
    return this.state.flag == true ? (
      <Redirect
        to={{
          pathname: "/displayPage",
          state: {
            paper: this.paper,
            subject: this.subject,
            analysis: this.analysis,
          },
          // state: { analysis: this.analysis },
        }}
      />
    ) : (
      // <Redirect
      //   to={{
      //     pathname: "/analysis",
      //     state: { analysis: this.analysis },
      //   }}
      // />
      <div>
        <h1>
          <b>Automated Paper Generation Using Genetic Algorithm</b>
        </h1>
        <div
          style={{
            display: "grid",
            placeContent: "center",
            paddingTop: "1%",
            fontFamily: "Helvetica",
            fontSize: "20px",
          }}
        >
          {/* onSubmit={this.FormSubmit} */}

          <h2>
            <b>Enter Test details :</b>
          </h2>
          <form id="input-form" onSubmit={this.FormSubmit}>
            <TextField
              required
              id="subject"
              variant="outlined"
              onChange={(e) => (this.subject = e.target.value)}
              label="Subject"
              style={{ marginRight: "10px" }}
            />

            <TextField
              required
              id="test-name"
              onChange={(e) => (this.testName = e.target.value)}
              variant="outlined"
              label="Test name"
            />
            <br />
            <br />
            <TextField
              required
              id="marks"
              variant="outlined"
              onChange={(e) => (this.totalMarks = e.target.value)}
              label="Total Marks"
              style={{ width: "120px", marginRight: "16px" }}
            />
            <TextField
              required
              id="question-count"
              variant="outlined"
              onChange={(e) => (this.totalQuestions = e.target.value)}
              label="Total questions"
              style={{ width: "150px", marginRight: "10px" }}
            />
            <br />
            {/* <TextField
              required
              label="Chapter-wise marks Distribution "
              id="chaps-no"
              style={{ width: "500px" }}
              onChange={(e) => {
                this.state.chapnum = e.target.value;
              }}
            />
            <br />
            <label htmlFor="chaps-no" style={{ marginRight: "46px" }}>
              <h6 style={{ fontSize: "15px", color: "red" }}>
                <i>(enter marks in order with spaces between them)</i>
              </h6>
            </label> */}
            <br />
            <br />
            <Typography id="discrete-slider-restrict" gutterBottom>
              Difficulty
            </Typography>
            <Slider
              // defaultValue={0}
              valueLabelFormat={valueLabelFormat}
              getAriaValueText={valuetext}
              aria-labelledby="difficulty"
              step={null}
              marks={marks}
              onChange={(e, val) => (this.difficulty = val)}
              onDragStop={() => this.update(this.difficulty)}
              max={3}
              min={1}
            />

            <br />
            <br />

            {/* <h4>
              <b>Create Test-ID and Password:</b>
            </h4>
            <label
              htmlFor="test-id"
              style={{ marginRight: "85px", marginBottom: "15px" }}
            >
              Create Test-ID
            </label>
            <input type="text" id="test-id" style={{ width: "100px" }} />
            <br />
            <label
              htmlFor="test-password"
              style={{ marginRight: "15px", marginBottom: "15px" }}
            >
              Create Test-Password
            </label>
            <input type="text" id="test-password" style={{ width: "100px" }} /> */}
            <br />
            <button className="btn btn-primary">Create Test</button>
          </form>
        </div>
      </div>
    );
  }
}

export default GeneticAlgo;
