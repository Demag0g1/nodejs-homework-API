const express = require("express");
const {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
  updateUserSubscription,
  userAuthController,
} = require("../../controllers");
const authenticateToken = require("../../middleware/auth");
const uploadAvatar = require("../../middleware/uploadAvatar");

const router = express.Router();

router.post("/login", loginUser);
router.post(
  "/logout",
  authenticateToken,
  logoutUser
);
router.post("/register", registerUser);
router.get(
  "/verify/:verificationToken",
  userAuthController.verifyEmail
);
router.post(
  "/verify",
  userAuthController.resendVerificationEmail
);

router.get(
  "/current",
  authenticateToken,
  getCurrentUser
);
router.patch(
  "/",
  authenticateToken,
  updateUserSubscription
);
router.patch(
  "/avatars",
  authenticateToken,
  uploadAvatar.single("avatar"),
  getCurrentUser.uploadAvatar
);

module.exports = router;
