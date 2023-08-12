import express from "express"
import { reactPostComment, getReactsComment, getReactsCommentUnauth } from "../../controller/React/CmReactCtrl.js"

import { isAuthenticatedUser } from "../../utils/auth.js"
const router = express.Router()
router.put("/react-comment", isAuthenticatedUser, reactPostComment);
router.get(
  "/get-react-comment/:id([0-9a-fA-F]{24})",
  isAuthenticatedUser,
  getReactsComment
);
router.get("/get-react-comment-unauth/:id([0-9a-fA-F]{24})",  getReactsCommentUnauth);
export default router;
