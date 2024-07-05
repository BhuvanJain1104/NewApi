import "./App.css";

import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import News from "./Components/News";
import Monkey from "./Components/Monkey";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0,
  };

  // Define setProgress method to update state.progress
  setProgress = (progress) => {
    this.setState({
      progress: progress,
    });
  };

  render() {
    console.log("API Key:", this.apiKey); // Debugging output
    return (
      <div>
        <Router>
          <NavBar />

          <Routes>
            <Route exact path="/" element={<Monkey />} />
            {/* Pass setProgress as a prop to News component */}
            <Route
              exact
              path="/home"
              element={
                <News
                  setProgress={this.setProgress} // Corrected usage here
                  key="general"
                  country="in"
                  category="General"
                  pageSize={12}
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  setProgress={this.setProgress} // Corrected usage here
                  key="business"
                  country="in"
                  category="Business"
                  pageSize={6}
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  key="entertainment"
                  country="in"
                  category="Entertainment"
                  pageSize={6}
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  key="health"
                  country="in"
                  category="Health"
                  pageSize={6}
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  key="science"
                  country="in"
                  category="Science"
                  pageSize={6}
                  apiKey={this.ApiKey}
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  key="sports"
                  country="in"
                  category="Sports"
                  pageSize={6}
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  key="technology"
                  country="in"
                  category="Technology"
                  pageSize={6}
                  apiKey={this.apiKey}
                />
              }
            />
          </Routes>
        </Router>
        <LoadingBar color="#cc6600" progress={this.state.progress} height={5} />
      </div>
    );
  }
}
