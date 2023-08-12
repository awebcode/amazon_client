import express from "express";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../../controller/message/conversation.controller.js";
import { isAuthenticatedUser } from "../../utils/auth.js";

const router = express.Router();

router.get("/conversations", isAuthenticatedUser, getConversations);
router.post("/conversations", isAuthenticatedUser, createConversation);
router.get("/conversations/single/:id", isAuthenticatedUser, getSingleConversation);
router.put("/conversations/:id", isAuthenticatedUser, updateConversation);

export default router;
