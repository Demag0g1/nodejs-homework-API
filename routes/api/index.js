const express = require("express");
const router = express.Router();
const ctrlContacts = require("./contacts");

router.get("/", ctrlContacts.listContacts);
router.get(
  "/:contactId",
  ctrlContacts.getContactById
);
router.post("/", ctrlContacts.addContact);
router.delete(
  "/:contactId",
  ctrlContacts.removeContact
);
router.patch(
  "/:contactId/favorite",
  ctrlContacts.updateStatus
);
router.put(
  "/:contactId",
  ctrlContacts.updateContact
);

module.exports = router;
