import stripe from "stripe";
import catchAsyncErrors from "../utils/catchAsyncErrors.js";

export const processPayment = catchAsyncErrors(async (req, res, next) => {
  const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

  const myPayment = await stripeInstance.paymentIntents.create({
    amount: req?.body?.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res.status(200).json({ success: true, client_secret: myPayment.client_secret });
});
export const sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
