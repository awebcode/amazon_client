import express from "express"
import categoryCtrl from "../controller/categoryCtrl.js"

import { isAuthenticatedUser, authorizeRoles } from "../utils/auth.js"

const router = express.Router();

router
  .route("/category")
  .get(categoryCtrl.getCategories)
  .post(isAuthenticatedUser, categoryCtrl.createCategory);

router
  .route("/category/:id")
  .patch(isAuthenticatedUser, categoryCtrl.updateCategory)
  .delete(isAuthenticatedUser, categoryCtrl.deleteCategory);

export default router;
