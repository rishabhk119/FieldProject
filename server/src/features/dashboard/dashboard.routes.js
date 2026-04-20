const express = require("express");
const { getDashboardStats, getRecentActivity } = require("./dashboard.controller");
const { protect, restrictTo } = require("../../middleware/auth.middleware");

const router = express.Router();

// Routes made public to support "Guest Mode" / Dashboard Overview
router.get("/stats", getDashboardStats);
router.get("/activity", getRecentActivity);

module.exports = router;
