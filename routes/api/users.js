const express = require("express");
const {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
  updateUserSubscription,
} = require("../../controllers");
const authenticateToken = require("../../middleware/auth");

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", authenticateToken, logoutUser);
router.post("/register", registerUser);
router.get("/current", authenticateToken, getCurrentUser);
router.patch("/", authenticateToken, updateUserSubscription);

module.exports = router;
