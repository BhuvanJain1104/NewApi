import React, { Component } from "react";
import monkeyIcon from "./monkey-icon1.jpg";
import { Link } from "react-router-dom"; // Assuming you are using React Router for navigation

export default class Monkey extends Component {
  render() {
    return (
      <div className="monkey-container">
        <Link to="/home" className="monkey-link">
          <h1>
            <b>CLICK ON ME TO YOUR NEWS</b>
          </h1>
          <img src={monkeyIcon} alt="Monkey Icon" className="monkey-icon" />
        </Link>
      </div>
    );
  }
}
