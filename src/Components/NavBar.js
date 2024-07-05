import React, { Component } from 'react';
import monkeyIcon from './monkey-icon.png';
import { Link, } from "react-router-dom";
export class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center py-2" to="/">
                        <span className="me-2"><b>NewsMonkey</b></span>
                        <img src={monkeyIcon} alt="Monkey Icon" width="30" height="30" className="my-auto" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item-active"><Link className="nav-link" aria-current="page" to="/home">Home</Link> </li>
                            <li className="nav-item"><Link className="nav-link" to="/business">Business</Link> </li>
                            <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link> </li>
                            <li className="nav-item"><Link className="nav-link" to="/health">Health</Link> </li>
                            <li className="nav-item"><Link className="nav-link" to="/science">Science</Link> </li>
                            <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link> </li>
                            <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link> </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
