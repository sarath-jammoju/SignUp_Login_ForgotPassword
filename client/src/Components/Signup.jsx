import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await Axios.post("http://localhost:3000/auth/signup", {
        username,
        email,
        password,
      });

      if (response.data.status) {
        toast.success("Registered successfully!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(response.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);

      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(error.response.data.message || "Signup failed. Please try again.");
      } else if (error.request) {
        // Request was made, but no response received
        toast.error("No response from the server. Please check your API.");
      } else {
        // Something went wrong while setting up the request
        toast.error("Unable to process the request. Please try again.");
      }
    }
  };

  return (
    <div className="sign-up-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="User name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
        <p>
          Have an Account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
