const express = require("express");
const { createOrder, verifyPayment } = require("./donations.controller");
const { protect } = require("../../middleware/auth.middleware");

const router = express.Router();

// Allow guests to create orders, but verifyPayment can record user ID if present
router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);

module.exports = router;
