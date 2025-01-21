import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      toast.error("All fields are required")
      return;
    }

    axios.post("http://localhost:3000/auth/login", {
        email,
        password,
    })
      .then((response) => {
        if (response.data.status) {
          toast.success("Login Success")
          navigate("/");
        }
        else{
          toast.error("Invalid credentials")
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid credentials")
      });
  };

  return (
    <div className="sign-up-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}


        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="email id"
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

        <button type="submit">Login</button>
        <Link to ="/forgotPassword">Forgot Password?</Link>
        <p>
         Don't have an Account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
