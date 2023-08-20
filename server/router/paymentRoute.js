import express from "express";

import { authorizeRoles, isAuthenticatedUser } from "../utils/auth.js";
import { processPayment, sendStripeApiKey } from "../controller/PaymentCtrl.js";
const router = express.Router();
router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

export default router;
