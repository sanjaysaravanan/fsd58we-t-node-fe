// src/pages/Register.js

import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createUserAPI } from "../apis";

const Register = () => {
  const isAuthenticated = Boolean(localStorage.getItem("user"));
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      console.log(data);
      alert("Passwords do not match");
      return;
    }
    try {
      delete data.confirmPassword;
      const resp = await createUserAPI(data);
      alert(resp?.msg || "User Creation Success");
      navigate("/login");
    } catch (e) {
      alert("Something Went Wrong, Please try again later");
      console.log("Error", e);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/posts" />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Full Name"
              name={"name"}
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Phone</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter Phone"
              name={"phone"}
              value={data.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name={"email"}
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={data.password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block w-100">
            Register
          </button>
        </form>
        <div className="mt-3 text-center">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
