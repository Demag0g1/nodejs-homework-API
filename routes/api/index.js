const express = require("express");
const router = express.Router();
const ctrlContacts = require("../../controllers");
const authenticateToken = require("../../middleware/auth");

router.get("/", authenticateToken, ctrlContacts.listContacts);
router.get("/:contactId", authenticateToken, ctrlContacts.getContactById);
router.post("/", authenticateToken, ctrlContacts.addContact);
router.delete("/:contactId", authenticateToken, ctrlContacts.removeContact);
router.patch(
  "/:contactId/favorite",
  authenticateToken,
  ctrlContacts.updateStatus
);
router.put("/:contactId", authenticateToken, ctrlContacts.updateContact);

module.exports = router;
