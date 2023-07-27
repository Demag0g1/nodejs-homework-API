const Contact = require("./schemas/contacts.js");

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId) => {
  return Contact.findOne({
    _id: contactId,
  });
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove({
    _id: contactId,
  });
};

const addContact = async ({ name, text }) => {
  return Contact.create({ name, text });
};

const updateContact = async (contactId, newName) => {
  return Contact.findByIdAndUpdate(
    { _id: contactId },
    { name: newName },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
