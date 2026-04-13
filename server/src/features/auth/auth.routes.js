const express = require("express");
const { body } = require("express-validator");
const { register, login, getMe, logout } = require("./auth.controller");
const { protect } = require("../../middleware/auth.middleware");
const { validateRequest } = require("../../middleware/validator.middleware");

const router = express.Router();

// Public routes
router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 50 }),
    body("email").isEmail().withMessage("Enter a valid email address").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  validateRequest,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  login
);

router.post("/logout", logout);

// Protected routes
router.get("/me", protect, getMe);

// Health check
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth routes working",
  });
});

module.exports = router;