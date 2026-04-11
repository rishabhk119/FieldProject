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

module.exports = router;