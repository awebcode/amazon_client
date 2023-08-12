import { isAuthenticatedUser } from "../utils/auth.js";
import express from "express";
import { allUsers, deleteUser, getSingleUser, login, logout, register, updatePassword, updateProfile, updateProfilePic, updateUserRole, userDetails } from "../controller/userCtrl.js";
 const router = express.Router();
 router.route("/register").post(register);
 router.route("/login").post(login);
router.route("/me").get(isAuthenticatedUser, userDetails);
router.route("/all-users").get(allUsers);
router.route("/logout").get(logout);
 router.route("/user/update").put(isAuthenticatedUser, updateProfile);
router.route("/user/update/pic").put(isAuthenticatedUser, updateProfilePic);
router.route("/update/password").put(isAuthenticatedUser, updatePassword);
router.route("/admin/user/single-user/:id").get(isAuthenticatedUser, getSingleUser);
router.route("/admin/user/delete/:id").delete(isAuthenticatedUser, deleteUser);
router.route("/admin/user/update/role/:id").put(isAuthenticatedUser, updateUserRole);

export default router;
