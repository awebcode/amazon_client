import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const Pay = () => {
     const [stripeApiKey, setStripeApiKey] = useState("");

     async function getStripeApiKey() {
       const { data } = await axios.get(
         `${process.env.REACT_APP_SERVER_URL}/api/v1/stripeapikey`,
         { withCredentials: true }
       );

       setStripeApiKey(data.stripeApiKey);
     }

     useEffect(() => {
       getStripeApiKey();
     }, [stripeApiKey]);
 
  return (
    <div>
      {" "}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
      )}
    </div>
  );
}

export default Pay