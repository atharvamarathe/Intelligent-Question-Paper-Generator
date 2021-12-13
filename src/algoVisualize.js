import React, { Component } from "react";
import Algorithm from "./Algorithm";
import { Line } from "react-chartjs-2";
import TextField from "@material-ui/core/TextField";
import mutation from "./mutation.png";
import popsize from "./popSize.png";
class AlgoVisualize extends Component {
  constructor() {
    super();
    this.algo = new Algorithm("Test", "Test", 100, 60, 1.5, 200, 1000, 0.08);
    this.labelsArr = [];
    this.mutateRate = 0.08;
    this.pop_size = 200;
  }
  state = {
    analyseFitness: null,
  };
  runAlgo = () => {
    this.labelsArr = [];
    this.algo = new Algorithm(
      "Test",
      "Test",
      100,
      60,
      1.5,
      this.pop_size,
      1000,
      this.mutateRate
    );
    console.log(this.algo.Analyse());
    for (let i = 0; i < this.algo.analyseFitness.length; i++)
      this.labelsArr.push(i + 1);
    this.setState({ analyseFitness: this.algo.analyseFitness });
  };
  render() {
    const data = {
      labels: this.labelsArr,
      datasets: [
        {
          label: "No of Iterations",
          data: this.algo.analyseFitness,
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 1)",
        },
      ],
    };

    const graph = {
      datasets: [
        {
          label: "No of Iterations",
          data: [
            195, 162, 130, 200, 106, 109, 80, 100, 100, 70, 75, 70, 75, 55, 55,
            67, 42, 49, 50, 41, 34, 36, 35, 27, 25, 27, 29, 35, 22, 25, 27, 18,
            28, 20, 21, 22, 19, 31, 14, 29,
          ],
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 1)",
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
          label: "Fitness Score",
        },
      },
    };

    return (
      <div>
        <h1 style={{ fontSize: "50px", color: "red" }}>
          Genetic Algorithm Visualizer
        </h1>
        <h3>
          How Mutation rate, Population Size affect the no of iterations
          required for the convergence of the Algorithm
        </h3>
        <div>
          <img src={popsize} style={{ height: "500px" }} />
        </div>
        <br />
        <br />

        <div>
          <img src={mutation} style={{ height: "500px" }} />
        </div>
        <br />
        <br />
        <div>
          <h1>Play the with the parameters and learn how it converges !</h1>
        </div>
        <div style={{ width: "800px", marginLeft: "23%" }}>
          <Line data={data} options={options} />
        </div>
        <div>
          <br />
          <br />
          <br />
          {/* <form id="input-form" onSubmit={this.FormSubmit}> */}
          <TextField
            required
            id="Population Size"
            variant="outlined"
            onChange={(e) => (this.pop_size = e.target.value)}
            label="Population Size"
            style={{ marginRight: "10px" }}
          />

          <TextField
            required
            id="Mutation Rate"
            onChange={(e) => (this.mutateRate = e.target.value)}
            variant="outlined"
            label="Mutation Rate"
          />
          <br />
          <br />
          <br />
          <br />
          <button
            onClick={this.runAlgo}
            style={{ height: "50px", width: "150px", fontSize: "20px" }}
          >
            Click Here{" "}
          </button>
          {/* </form> */}
        </div>
      </div>
    );
  }
}

export default AlgoVisualize;
