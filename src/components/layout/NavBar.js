import React from "react";
import "../../styles/Toggle.css";
import monkeyIcon from "../../assets/images/monkey-icon.png";
import SearchBar from "../common/SearchBar";

import { NavLink, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUserCircle,
  faRightFromBracket,
  faBookmark,
  faSliders,
  faBars,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = ({
  onSearch,
  darkMode,
  toggleDarkMode,
  authPage,
}) => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top navbar-${
        darkMode ? "dark" : "light"
      } bg-${darkMode ? "light" : "dark"}`}
    >
       <div className="container-fluid px-4">

        <NavLink
          to="/home"
          className="navbar-brand d-flex align-items-center"
        >
          <img
            src={monkeyIcon}
            width="34"
            height="34"
            alt=""
            className="me-2"
          />

          <b
            className={
              darkMode
                ? "text-dark"
                : "text-white"
            }
          >
            NewsMonkey
          </b>

        </NavLink>

        {authPage ? (

          <div className="ms-auto d-flex gap-2">

            <NavLink
              to="/home"
              className={`btn ${
                darkMode
                  ? "btn-outline-dark"
                  : "btn-outline-light"
              }`}
            >
              Home
            </NavLink>

            <NavLink
              to="/login"
              className={`btn ${
                darkMode
                  ? "btn-outline-dark"
                  : "btn-outline-light"
              }`}
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="btn btn-warning"
            >
              Register
            </NavLink>

          </div>

        ) : (

          <>
                      <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

         <div
  className="collapse navbar-collapse justify-content-between"
  id="navbarSupportedContent"
>

              <ul className="navbar-nav ms-auto align-items-lg-center">

                {[
                  ["Home", "/home"],
                  ["Business", "/business"],
                  ["Entertainment", "/entertainment"],
                  ["Health", "/health"],
                  ["Science", "/science"],
                  ["Sports", "/sports"],
                  ["Technology", "/technology"],
                  ["Bookmarks", "/bookmarks"],
                ].map(([label, path]) => (

                  <li
                    className="nav-item"
                    key={path}
                  >
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `${isActive ? "active-nav" : ""} nav-link ${
                          darkMode ? "text-dark" : "text-light"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </li>

                ))}

              </ul>

        <div className="d-flex align-items-center ms-3 flex-shrink-0">
                <SearchBar
                  onSearch={onSearch}
                  darkMode={darkMode}
                />

                <div className="dropdown ms-3">
                  <button
                    className="btn"
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "10px",
                      background: "#ff9800",
                      color: "#fff",
                    }}
                    data-bs-toggle="dropdown"
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end">
                    {user && (
  <>
    <li>
      <NavLink
        to="/profile"
        className="dropdown-item"
      >
        <FontAwesomeIcon
          icon={faUserCircle}
          className="me-2"
        />
        Profile
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/preferences"
        className="dropdown-item"
      >
        <FontAwesomeIcon
          icon={faSliders}
          className="me-2"
        />
        Preferences
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/bookmarks"
        className="dropdown-item"
      >
        <FontAwesomeIcon
          icon={faBookmark}
          className="me-2"
        />
        My Bookmarks
      </NavLink>
    </li>

    <li>
      <hr className="dropdown-divider" />
    </li>
  </>
)}

<li>
  <button
    className="dropdown-item"
    onClick={toggleDarkMode}
  >
    <FontAwesomeIcon
      icon={darkMode ? faSun : faMoon}
      className="me-2"
    />

    {darkMode
      ? "Light Mode"
      : "Dark Mode"}
  </button>
</li>

<li>
  <hr className="dropdown-divider" />
</li>

{user ? (
  <li>
    <button
      className="dropdown-item text-danger"
      onClick={handleLogout}
    >
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className="me-2"
      />
      Logout
    </button>
  </li>
) : (
  <>
    <li>
      <NavLink
        to="/login"
        className="dropdown-item"
      >
        Login
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/register"
        className="dropdown-item"
      >
        Register
      </NavLink>
    </li>
  </>
)}

                  </ul>

                </div>

              </div>

            </div>

          </>

        )}

      </div>

    </nav>
  );
};

export default NavBar;