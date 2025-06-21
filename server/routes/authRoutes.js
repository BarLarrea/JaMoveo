import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

// Public routes (no token required)
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route (requires token)
router.post("/logout", authenticateToken, logoutUser);

export default router;
