import React, { Component } from "react";
import { Pie, Bar, Radar } from "react-chartjs-2";
class Analysis extends Component {
  constructor(props) {
    super(props);
    console.log(100 - this.state.diff);
  }

  state = {
    chapterDistribution: this.props.location.state.analysis.chapterDistribution,
    marksDistribution: this.props.location.state.analysis.marksDistribution,
    difficultyDistribution:
      this.props.location.state.analysis.difficultyDistribution,
    diff: this.props.location.state.analysis.diff,
  };
  render() {
    const chapDis = {
      //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: this.state.chapterDistribution,
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    const chapDisOptions = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Chapter Distribution",
        },
      },
    };
    const marksDis = {
      labels: ["1 mark Q's", "2 marks Q's", "3 marks Q's"],
      datasets: [
        {
          label: "no of Q's",
          data: this.state.marksDistribution,
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const marksDisOptions = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Mark Distribution",
        },
      },
    };
    const difficultyDis = {
      labels: ["Easy", "Medium", "Hard"],
      datasets: [
        {
          label: "no of Q's",
          data: this.state.difficultyDistribution,
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const difficultyDisOptions = {
      indexAxis: "y",
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Difficulty of the Paper",
        },
      },
    };
    const diff = {
      labels: [
        "Difficulty",
        "Total Marks",
        "Total Questions",
        "Course Outcomes",
        "Chapter Distribution",
      ],
      datasets: [
        {
          label: "Overall Analysis",
          data: [100 - this.state.diff, 100, 100, 100, 90],
          backgroundColor: " rgba(54, 162, 235, 0.8)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 0.1,
        },
      ],
    };

    const diffOptions = {
      scale: {
        ticks: { beginAtZero: true },
      },
    };
    return (
      <>
        <div>
          <h1>Analysis of Paper</h1>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "350px" }}>
            <Pie data={chapDis} options={chapDisOptions} />
          </div>
          <div style={{ width: "470px", paddingLeft: "300px" }}>
            <Bar data={marksDis} options={marksDisOptions} />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ height: "700px", width: "470px", paddingTop: "80px" }}>
            <Bar data={difficultyDis} options={difficultyDisOptions} />
          </div>
          <div
            style={{ height: "700px", width: "400px", paddingLeft: "170px" }}
          >
            <Radar data={diff} options={diffOptions} />
          </div>
        </div>
      </>
    );
  }
}

export default Analysis;
