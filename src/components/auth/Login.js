import React, { useState } from "react";
import API from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import monkeyIcon from "../../assets/images/monkey-icon.png";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful!");
        navigate("/home");
   

    } catch (err) {

      alert(err.response.data.message);

    }
  };

  return (

    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f8f9fa,#e9ecef)"
      }}
    >

      <div
        className="card shadow-lg border-0"
        style={{
          width: "430px",
          borderRadius: "18px"
        }}
      >

        <div className="card-body p-5">

          <div className="text-center mb-4">

            <img
              src={monkeyIcon}
              width="75"
              alt=""
            />

            <h2 className="mt-3 fw-bold">
              Welcome Back
            </h2>

            <p className="text-muted">
              Sign in to continue reading news
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <input
              className="form-control form-control-lg mb-3"
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
            />

            <input
              className="form-control form-control-lg mb-4"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
                        <button
              type="submit"
              className="btn btn-warning w-100 py-2 fw-bold"
              style={{
                borderRadius: "10px",
                fontSize: "17px",
              }}
            >
              Login
            </button>

          </form>

          <hr className="my-4" />

          <p className="text-center mb-0">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="fw-bold text-warning text-decoration-none"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
};

export default Login;