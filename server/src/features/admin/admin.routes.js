const express = require("express");
const {
  getUsers,
  changeUserRole,
  deleteUser,
  getAllDonations,
  getAnalytics,
} = require("./admin.controller");
const { protect, restrictTo } = require("../../middleware/auth.middleware");
const {
  getCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  overrideDonationStatus,
  impersonateUser,
  broadcastActivity,
  getSettings,
  updateSettings,
} = require("./admin-god.controller");

const router = express.Router();

// All admin routes are protected + admin only
router.use(protect, restrictTo("admin"));

router.get("/users", getUsers);
router.patch("/users/:id/role", changeUserRole);
router.delete("/users/:id", deleteUser);
router.get("/donations", getAllDonations);
router.get("/analytics", getAnalytics);

// --- GOD MODE ROUTES ---
router.get("/campaigns", getCampaigns);
router.post("/campaigns", createCampaign);
router.patch("/campaigns/:id", updateCampaign);
router.delete("/campaigns/:id", deleteCampaign);

router.patch("/donations/:id/override", overrideDonationStatus);
router.post("/impersonate/:id", impersonateUser);
router.post("/broadcast", broadcastActivity);

router.get("/settings", getSettings);
router.patch("/settings", updateSettings);

module.exports = router;
