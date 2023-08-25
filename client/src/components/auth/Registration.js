import React, { useState } from "react";
import "./registration.css";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/auth";
import { useUserContext } from "../../redux/UserContext";
import { Form, Input, Button, Typography, Spin, Alert } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const RegistrationForm = () => {
  const [registerUser, { isLoading, isError, isFetching }] = useRegisterMutation();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const [form] = Form.useForm(); // Initialize Ant Design form

  const handleRegistration = async (values) => {
    try {
      const response = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (response.data.success) {
        navigate("/profile");
      }

      console.log("Registration successful:", response);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <Title level={2}>Create Account</Title>
        <Form
          form={form}
          onFinish={handleRegistration}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Your Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Your Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter a password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              visibilityToggle={true}
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="registration-btn"
              type="primary"
              htmlType="submit"
              loading={isLoading || isFetching}
              block
            >
              {isLoading || isFetching ? "Creating..." : "Create your Amazon account"}
            </Button>
          </Form.Item>
        </Form>
        {isError && <Alert message="Error occurred during registration" type="error" />}
        <Text className="fine-print">
          By creating an account, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </Text>
        <hr />
        <Text>
          Already have an account? <Link to="/signin">Sign-In</Link>
        </Text>
      </div>
    </div>
  );
};

export default RegistrationForm;
