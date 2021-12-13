import logo from "./logo.svg";
import React, { Component } from "react";
import "./App.css";
import Question from "./question";
import Algorithm from "./geneticAlgo";
import GeneticAlgo from "./GeneticAlgo";
import AlgoVisualize from "./algoVisualize";
// import { Route, Router } from "react-router";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import DisplayPaper from "./displayPaper";
import Analysis from "./analysis";
class App extends Component {
  constructor(props) {
    super(props);
    this.algo = new Algorithm();
    this.paper = null;
    this.analytics = null;
  }

  render() {
    return (
      <div className="App">
        {/* <AlgoVisualize /> */}
        <Router>
          <Switch>
            <Route exact path="/">
              <GeneticAlgo />
            </Route>
            <Route exact path="/visualize">
              <AlgoVisualize />
            </Route>
            <Route
              exact
              path="/displayPage"
              render={(props) => <DisplayPaper {...props} />}
            ></Route>
            <Route
              exact
              path="/analysis"
              render={(props) => <Analysis {...props} />}
            ></Route>
          </Switch>
        </Router>
        <br />
        <br />
        <a href="/visualize">
          <h3>To see how the Algorithm works click here !</h3>
        </a>
      </div>
    );
  }
}

export default App;
