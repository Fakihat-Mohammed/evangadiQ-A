import express from "express";
import register  from "../Controllers/userController.js";

const router = express.Router();

// Create a new user Route
router.post("/register", register);

export default router;
