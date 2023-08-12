import express from "express"
import commentCtrl from "../controller/commentCtrl.js"
import { isAuthenticatedUser } from "../utils/auth.js"

const router = express.Router();

router.post("/comment/:id", isAuthenticatedUser, commentCtrl.createComment);

router.get("/comments/product/:id", commentCtrl.getComments);


router.post("/reply_comment", isAuthenticatedUser, commentCtrl.replyComment);

router.patch("/comment/:id", isAuthenticatedUser, commentCtrl.updateComment);

router.delete("/comment/:id", isAuthenticatedUser, commentCtrl.deleteComment);

export default router;
