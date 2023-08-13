import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom"; // Change useNavigate to Navigate
import { useLoginMutation } from "../../redux/auth";
import { useUserContext } from "../../redux/UserContext";

const LoginForm = () => {
  const navigate = useNavigate(); // Change useNavigate to Navigate
  const [loginUser, { isLoading, isError }] = useLoginMutation();
  const { user } = useUserContext(); 
  console.log()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({
        email,
        password,
      });

      if (response.data) {
        console.log(response)
        // You can set your token in the cookies here
        // Cookies.set("token", response.data.token);

        // Navigate to the desired route
        navigate("/account");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  // useEffect(() => {
  //   if (user?.user) {
  //   }
  //   navigate("/account");
  // }, [navigate, user?.user]);
  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>Login to your Account</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <button className="registration-btn" type="submit">
            {isLoading ? "Logging in..." : "Login to your Amazon account"}
          </button>
        </form>
        {isError && <p className="error-message">Error occurred during login</p>}
        <p className="fine-print">
          By logging into an account, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
        <hr />
        <p>
          Don't have an account? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
