
import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams(); // Extract token from URL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      toast.error("Please enter password");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/auth/resetpassword/${token}`, { password });

      if (response.data.status) {
        toast.success("Password reset successfully! Please log in with your new password.");
        navigate("/login");
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      console.log(err);
      toast.error('Error occurred, please try again later');
    }
  };

  return (
    <div className="sign-up-container">
      {/* Ensure ToastContainer is rendered here */}
      <ToastContainer  />
      
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;







// import React, { useState } from 'react';
// import '../App.css';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ResetPassword = () => {
//   const [password, setPassword] = useState("");
//   const { token } = useParams(); // Extract token from URL
//   const navigate = useNavigate();
  
//   const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!password) {
//       toast.error("Please enter password");
//       return;
//     }

//     // Example password validation (optional)
//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters long");
//       return;
//     }

//     try {
//       const response = await axios.post(`${backendUrl}/auth/resetpassword/${token}`, { password });

//       if (response.data.status) {
//         toast.success("Password reset successfully! Please log in with your new password.");
//         navigate("/login");
//       } else {
//         toast.error(response.data.message || 'Something went wrong');
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error('Error occurred, please try again later');
//     }
//   };

//   return (
//     <div className="sign-up-container">
//       {/* Ensure ToastContainer is rendered here */}
//       <ToastContainer  />
      
//       <form className="sign-up-form" onSubmit={handleSubmit}>
//         <h2>Reset Password</h2>
//         <label htmlFor="password">New Password:</label>
//         <input
//           type="password"
//           placeholder="********"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Reset</button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;
