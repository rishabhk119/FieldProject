const express = require("express");
const { register, login } = require("./auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth routes working",
  });
});

module.exports = router;