const express = require("express");
const { body } = require("express-validator");
const {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} = require("./contact.controller");
const { protect, restrictTo } = require("../../middleware/auth.middleware");
const { validateRequest } = require("../../middleware/validator.middleware");

const router = express.Router();

// Public
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("message").trim().notEmpty().withMessage("Message is required"),
  ],
  validateRequest,
  submitContact
);

// Admin only
router.get("/", protect, restrictTo("admin"), getContacts);
router.patch("/:id/status", protect, restrictTo("admin"), updateContactStatus);
router.delete("/:id", protect, restrictTo("admin"), deleteContact);

module.exports = router;
