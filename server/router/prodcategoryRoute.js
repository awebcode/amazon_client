import express from "express";


import { isAuthenticatedUser } from "../utils/auth.js";
import { createCategory,updateCategory,deleteCategory,getCategory,getallCategory } from "../controller/prodcategoryCtrl.js";

const router = express.Router();

router.post("/create", isAuthenticatedUser, createCategory);
router.put("/update/:id", isAuthenticatedUser, updateCategory);
router.delete("/delete/:id", isAuthenticatedUser, deleteCategory);
router.get("/get/:id", getCategory);
router.get("/get", getallCategory);

export default router;
