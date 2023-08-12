import express from "express";
import tagCtrl from "../controller/TagCtrl.js";


import { isAuthenticatedUser, authorizeRoles } from "../utils/auth.js";

const router = express.Router();

router
  .route("/tag")
  .get(tagCtrl.getTag)
  .post(isAuthenticatedUser, tagCtrl.createTag);

router
  .route("/tag/:id")
  .patch(isAuthenticatedUser, tagCtrl.updateTag)
  .delete(isAuthenticatedUser, tagCtrl.deleteTag);

export default router;
