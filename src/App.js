import "./styles/app.css";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./AppRoutes";

import ScrollToTopButton from "./components/layout/ScrollToTopButton";

import LoadingBar from "react-top-loading-bar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default class App extends Component {


  state = {
    progress: 0,
    searchQuery: "",
    darkMode: false,
    country: "us",
  };

  setProgress = (progress) => {
    this.setState({
      progress,
    });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
    });
  };

  toggleDarkMode = () => {
    this.setState((prevState) => ({
      darkMode: !prevState.darkMode,
    }));
  };

  handleCountryChange = (country) => {
    this.setState({
      country,
    });
  };

  render() {
    return (
      <>
        <Router>

          <AppRoutes
            handleSearch={this.handleSearch}
            darkMode={this.state.darkMode}
            toggleDarkMode={this.toggleDarkMode}
            country={this.state.country}
            handleCountryChange={this.handleCountryChange}
            setProgress={this.setProgress}
            searchQuery={this.state.searchQuery}
          />

        </Router>

        <LoadingBar
          color="#cc6600"
          progress={this.state.progress}
          height={5}
        />

        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme={this.state.darkMode ? "dark" : "light"}
        />

        <ScrollToTopButton
          darkMode={this.state.darkMode}
        />
      </>
    );
  }
}