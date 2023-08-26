import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "./CheackoutSteps";
import { useSelector, useDispatch } from "react-redux";

import { Typography } from "@material-ui/core";
import { toast } from "react-toastify";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import {Button}from "antd"
import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../actions/orderAction";
import { useMeQuery } from "../redux/auth";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";


const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo } = useSelector((state) => state.cart.order);
  const { cart: cartItems } = useSelector((state) => state.cart);
  const { data: userData, isLoading, isError, isFetching } = useMeQuery();
  console.log("cartitems",cartItems,cartItems?.products)
//   const { error } = useSelector((state) => state.newOrder);
    useEffect(() => {
      if (cartItems && !cartItems) {
        toast.warning("Please add cart items!");
        navigate("/cart");
      }
    }, [cartItems, navigate]);
    const [stripeApiKey, setStripeApiKey] = useState("");
  const [processingPayment, setProcessingPayment] = useState(false);
  const [stripePaymentLoading, setstripePaymentLoading] = useState(false);
  async function getStripeApiKey() {
      setstripePaymentLoading(true);
     try {
       const { data } = await axios.get(
         `${process.env.REACT_APP_SERVER_URL}/api/v1/stripeapikey`,
         { withCredentials: true }
       );

       setStripeApiKey(data.stripeApiKey);
     } catch (error) {
      toast.error(error?.response?.data)
     } finally {
       setstripePaymentLoading(false)
     }
    }

    useEffect(() => {
      getStripeApiKey();
    }, [stripeApiKey]);
 
  const error=""
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
 if (isLoading) return <h1 className="text-center text-2xl font-thin md:text-5xl">Loading....</h1>;
  if (isFetching) return <h1 className="text-center text-2xl font-thin md:text-5xl">Fetching....</h1>;
  // if (stripePaymentLoading) return <h1 className="text-center text-2xl font-thin md:text-5xl">Getting Stripe Key....</h1>;
  const order = {
    shippingInfo,
    orderItems: cartItems && cartItems.products,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
 
  
  const submitHandler = async (e) => {
    e.preventDefault();
   setProcessingPayment(true)
    payBtn.current.disabled = true;

    try {
      
      const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/payment/process`, paymentData, {
        withCredentials:true
      });

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: userData?.user?.name,
            email: userData?.user?.email,
            address: {
              line1: shippingInfo?.address,
              city: shippingInfo?.city,
              state: shippingInfo?.state,
              postal_code: shippingInfo?.pinCode,
              country: shippingInfo?.country,
            },
          },
        },
      });
        // console.log("payment result",result)

      if (result.error) {
        payBtn.current.disabled = false;

        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
           
           dispatch(createOrder(order));

            
            
          
            
               localStorage.removeItem("cart");
               navigate("/success");
            
            
            
            ;
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    //   localStorage.removeItem("cart");
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    } finally {
      setProcessingPayment(false);
    }
  };

 

  return (
    <Fragment>
      {/* <MetaData title="Payment" /> */}

      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Payment Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <Button
            ref={payBtn}
            type="primary"
            htmlType="submit"
            
            loading={processingPayment}
            disabled={processingPayment}
            className="bg-blue-600 w-full"
          >
            {processingPayment
              ? "Submitting..."
              : `Pay - ₹${orderInfo && orderInfo.totalPrice}`}
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
