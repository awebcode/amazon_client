import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { toast,  } from "react-toastify";


import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/forget-password`,
        values,
        {withCredentials:true}
      );

      setLoading(false);
      form.resetFields(); // Clear form fields after success
      toast.success(response.data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <h2>Forget Password</h2>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="bg-green-500">
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/signin">Go back to login</Link>
        </Form.Item>
      </Form>
      
    </div>
  );
};

export default ForgetPassword;
