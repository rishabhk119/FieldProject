const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the FieldProject API",
  });
});

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API healthy",
  });
});

router.use("/auth", require("../features/auth/auth.routes"));
router.use("/dashboard", require("../features/dashboard/dashboard.routes"));
router.use("/donations", require("../features/donation/donations.routes"));
router.use("/admin", require("../features/admin/admin.routes"));
router.use("/contacts", require("../features/contact/contact.routes"));

module.exports = router;