const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../controllers");
const authenticateToken = require("../../middleware/auth");
const router = express.Router();

router.get("/", authenticateToken, listContacts);
router.get("/:id", authenticateToken, getContactById);
router.post("/", authenticateToken, addContact);
router.put("/:id", authenticateToken, updateContact);
router.delete("/:id", authenticateToken, removeContact);

module.exports = router;
