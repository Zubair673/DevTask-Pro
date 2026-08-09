import express from "express";

import {
  registerUser,
  loginUser,
  resetPassword,
  updateProfile,
} from "../controllers/authController.js";

import authMiddleware, {
  adminMiddleware,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ======================================
// Test Route
// ======================================
router.get("/hello", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth Routes Working Successfully ✅",
  });
});

// ======================================
// Admin Protected Test
// ======================================
router.get(
  "/admin-test",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Admin access granted 👑",
      user: {
        id: req.user._id,
        name: req.user.name,
        role: req.user.role,
      },
    });
  }
);

// ======================================
// Register
// ======================================
router.post("/register", registerUser);

// ======================================
// Login
// ======================================
router.post("/login", loginUser);

// ======================================
// Reset Password
// ======================================
router.post("/reset-password", resetPassword);

// ======================================
// Update Profile
// ======================================
router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  updateProfile
);

export default router;