const express = require("express");
const { getDashboardStats, getRecentActivity } = require("./dashboard.controller");
const { protect } = require("../../middleware/auth.middleware");

const router = express.Router();

router.use(protect);

router.get("/stats", getDashboardStats);
router.get("/activity", getRecentActivity);

module.exports = router;
