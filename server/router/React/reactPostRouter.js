import express from "express"
import { reactPost, getReacts, getReactsUnauth } from "../../controller/React/PostReactCtrl.js"
import { isAuthenticatedUser } from "../../utils/auth.js"
const router = express.Router()
router.put("/react-post", isAuthenticatedUser, reactPost)
router.get("/get-react-post/:id([0-9a-fA-F]{24})", isAuthenticatedUser, getReacts);
router.get("/get-react-post-unauth/:id([0-9a-fA-F]{24})", getReactsUnauth);
export default router;