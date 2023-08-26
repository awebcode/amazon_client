import React, { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to navigate after 5 seconds
    const timeout = setTimeout(() => {
      window.localStorage.removeItem("cart");
      localStorage.removeItem("cart");
      navigate("/profile/orders"); // Replace with the desired route
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, [navigate]);
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/profile/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
