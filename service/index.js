 const contacts = require('./schemas/contacts')

const listContacts = async () => {return contacts.find()}

const getContactById = async (contactId) => {return contacts.findOne({ _id: contactId })}

const removeContact = async (contactId) => {return contacts.findByIdAndRemove({ _id: contactId })}

const addContact = async ({ name, text }) => {return contacts.create({ name, text })
}

const updateContact = async (contactId, name) => {return contacts.findByIdAndUpdate({ _id: contactId }, name, { new: true })}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
