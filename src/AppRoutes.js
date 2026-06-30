import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import NavBar from "./components/layout/NavBar";

import Monkey from "./components/news/Monkey";
import News from "./components/news/News";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import Bookmarks from "./components/bookmarks/Bookmarks";

import Profile from "./components/profile/Profile";
import Preferences from "./components/profile/Preferences";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default function AppRoutes(props) {
  const location = useLocation();

 const authPage =
  location.pathname === "/login" ||
  location.pathname === "/register";
  return (
    <>

  <NavBar
  authPage={authPage}
  onSearch={props.handleSearch}
  darkMode={props.darkMode}
  toggleDarkMode={props.toggleDarkMode}
  country={props.country}
  onCountryChange={props.handleCountryChange}
/>

      <Routes>

        <Route
          path="/"
          element={<Monkey />}
        />

        <Route
          path="/login"
          element={
            <Login
              darkMode={props.darkMode}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              darkMode={props.darkMode}
            />
          }
        />

        <Route
          path="/home"
          element={
            <News
              darkMode={props.darkMode}
              setProgress={props.setProgress}
              key="general"
              country={props.country}
              category="General"
              pageSize={12}
            />
          }
        />

        <Route
          path="/search"
          element={
            <News
              darkMode={props.darkMode}
              setProgress={props.setProgress}
              key={props.searchQuery}
              country={props.country}
              pageSize={12}
              searchQuery={props.searchQuery}
            />
          }
        />

        <Route
          path="/business"
          element={
            <News
              darkMode={props.darkMode}
              setProgress={props.setProgress}
              key="business"
              country={props.country}
              category="Business"
              pageSize={6}
            />
          }
        />

        <Route
          path="/entertainment"
          element={
            <News
              darkMode={props.darkMode}
              setProgress={props.setProgress}
              key="entertainment"
              country={props.country}
              category="Entertainment"
              pageSize={6}
            />
          }
        />
                <Route
          path="/health"
          element={
            <News
              darkMode={props.darkMode}
              setProgress={props.setProgress}
              key="health"
              country={props.country}
              category="Health"
              pageSize={6}
            />
          }
        />

        <Route
          path="/science"
          element={
            <News
              darkMode={props.darkMode}
              setProgress={props.setProgress}
              key="science"
              country={props.country}
              category="Science"
              pageSize={6}
            />
          }
        />

        <Route
          path="/sports"
          element={
            <News
              darkMode={props.darkMode}
              setProgress={props.setProgress}
              key="sports"
              country={props.country}
              category="Sports"
              pageSize={6}
            />
          }
        />

        <Route
          path="/technology"
          element={
            <News
              darkMode={props.darkMode}
              setProgress={props.setProgress}
              key="technology"
              country={props.country}
              category="Technology"
              pageSize={6}
            />
          }
        />

        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks
                darkMode={props.darkMode}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile
                darkMode={props.darkMode}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/preferences"
          element={
            <ProtectedRoute>
              <Preferences
                darkMode={props.darkMode}
              />
            </ProtectedRoute>
          }
        />

      </Routes>

    </>
  );
}