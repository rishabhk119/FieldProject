const express = require("express");
const { createOrder, verifyPayment, downloadReceipt, getMyDonations } = require("./donations.controller");
const { protect } = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);
router.get("/my", protect, getMyDonations);
router.get("/:id/receipt", protect, downloadReceipt);

module.exports = router;
