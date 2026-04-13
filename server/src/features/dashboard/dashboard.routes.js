const express = require("express");
const { getDashboardStats, getRecentActivity } = require("./dashboard.controller");
const { protect, restrictTo } = require("../../middleware/auth.middleware");

const router = express.Router();

router.use(protect);

router.get("/stats", restrictTo("admin"), getDashboardStats);
router.get("/activity", restrictTo("admin"), getRecentActivity);

module.exports = router;
