import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import monkeyIcon from "../../assets/images/monkey-icon.png";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", formData);

      alert("Registration Successful!");

      navigate("/login");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f8f9fa,#e9ecef)",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "450px",
          borderRadius: "18px",
        }}
      >
        <div className="card-body p-5">

          <div className="text-center mb-4">

            <img
              src={monkeyIcon}
              alt="NewsMonkey"
              width="75"
            />

            <h2 className="fw-bold mt-3">
              Create Account
            </h2>

            <p className="text-muted">
              Join NewsMonkey and personalize your news
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <input
              className="form-control form-control-lg mb-3"
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />

            <input
              className="form-control form-control-lg mb-3"
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
            />

            <input
              className="form-control form-control-lg mb-4"
              type="password"
              name="password"
              placeholder="Password"
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
              Create Account
            </button>

          </form>

          <hr className="my-4" />

          <p className="text-center mb-0">
            Already have an account?{" "}

            <Link
              to="/login"
              className="fw-bold text-warning text-decoration-none"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;