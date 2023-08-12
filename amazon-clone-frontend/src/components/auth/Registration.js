import React, { useEffect, useState } from "react";
import "./registration.css";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/auth";
import { useUserContext } from "../../redux/UserContext";


const RegistrationForm = () => {
  const [registerUser, { isLoading, isError,isFetching }] = useRegisterMutation();
  const { user } = useUserContext(); 
 const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({
        name,
        email,
        password,
      });
  if (response.data.success) {
    navigate("/");
  }
      // Handle success or show a success message
      console.log("Registration successful:", response);
    } catch (error) {
      // Handle error or show an error message
      console.error("Registration error:", error);
    }
  };
// useEffect(() => {
//   if (user?.user) {
//   }
//   navigate("/account");
// }, [navigate, user?.user]);
  if (isLoading) return <h1 className="text-center text-5xl">Loading....</h1>;
  if (isFetching) return <h1 className="text-center text-5xl">Fetching....</h1>;
  
  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>Create Account</h2>
        <form onSubmit={handleRegistration}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Your Name"
            required
          />
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
            {isLoading ? "Creating..." : "Create your Amazon account"}
          </button>
        </form>
        {isError && <p className="error-message">Error occurred during registration</p>}
        <p className="fine-print">
          By creating an account, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
        <hr />
        <p>
          Already have an account? <Link to="/signin">Sign-In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
