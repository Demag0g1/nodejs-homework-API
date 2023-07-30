const { loginUser } = require("./auth/userLoginController.js");
const { registerUser } = require("./auth/userRegistrationController.js");
const { listContacts } = require("./contact/contactController.js");
const {
  getContactById,
  addContact,
  updateContact,
  updateStatus,
  removeContact,
} = require("./contact/contactsManagementController.js");

module.exports = {
  loginUser,
  registerUser,
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatus,
  removeContact,
};
