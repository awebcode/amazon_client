import { isAuthenticatedUser } from "../utils/auth.js";
import express from "express";
import { createProduct, deleteProduct, getAllProduct, getAllProducts, getAllUserProduct, getProductDetails, updateProduct } from "../controller/ProductCtrl.js";
const router = express.Router()
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router
  .route("/create")
  .post(isAuthenticatedUser,  createProduct);
router.get("/get", getAllProduct);
router.get("/get-all", getAllProducts);
router.get("/get/user/products",isAuthenticatedUser, getAllUserProduct); //auth add me
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);
router.get("/get-details/:id", getProductDetails);
export default router;