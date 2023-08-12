import express from "express";
import {
  createMessage,
  getMessages,
} from "../../controller/message/message.controller.js";
import { isAuthenticatedUser } from "../../utils/auth.js";

const router = express.Router();

router.post("/message", isAuthenticatedUser, createMessage);
router.get("/message/:id", isAuthenticatedUser, getMessages);

export default router;
