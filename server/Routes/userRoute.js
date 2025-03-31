import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { registerUser, loginUser } from "../Controllers/userController.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", authMiddleware, loginUser);
export default router;
