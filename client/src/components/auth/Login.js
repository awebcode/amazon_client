import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/auth";
import { toast } from "react-toastify";
import { Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

 // Make sure to include your custom styles

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginUser, { isError }] = useLoginMutation();
const navigate=useNavigate()
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

  // Define handleLogin function within the component body
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginUser({
        email,
        password,
      });

      if (response.data) {
        console.log(response);
        toast.success("Login successful!");
        navigate("/profile"); // Use the correct function name "Navigate"
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>Login to your Account</h2>
        <form onSubmit={handleLogin}>
          <Input
            prefix={<UserOutlined />}
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="input-field my-6"
          />
          <Input.Password
            prefix={<LockOutlined />}
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder="Password"
            required
            className="input-field my-6"
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
          />
          <Button
            className="registration-btn"
            type="primary"
            htmlType="submit"
            loading={isLoading}
            block
          >
            {isLoading ? "Logging in..." : "Login to your Amazon account"}
          </Button>
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
