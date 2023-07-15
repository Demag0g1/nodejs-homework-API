const fs = require("fs/promises");
const path = require("path");
const Joi = require("joi");

const contactsPath = path.join(
  __dirname,
  "contacts.json"
);

const listContacts = async () => {
  try {
    const data = await fs.readFile(
      contactsPath,
      "utf-8"
    );
    return JSON.parse(data);
  } catch (error) {
    console.error(
      "Error reading contacts file:",
      error
    );
    return [];
  }
};

const getContactById = async (
  contactId
) => {
  const contacts = await listContacts();
  return (
    contacts.find(
      (contact) =>
        contact.id === contactId
    ) || null
  );
};

const removeContact = async (
  contactId
) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) =>
      contact.id === contactId
  );
  if (index !== -1) {
    const removedContact =
      contacts.splice(index, 1);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2)
    );
    return removedContact[0];
  }
  return null;
};

const addContact = async (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    phone: Joi.string().required(),
  });
  const { error, value } =
    schema.validate(body);
  if (error) {
    throw new Error(
      error.details[0].message
    );
  }
  const contacts = await listContacts();
  const newContact = { ...value };
  contacts.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
};

const updateContact = async (
  contactId,
  body
) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  });

  const { error, value } =
    schema.validate(body);
  if (error) {
    throw new Error(
      error.details[0].message
    );
  }

  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) =>
      contact.id === contactId
  );
  if (index !== -1) {
    contacts[index] = {
      ...contacts[index],
      ...value,
    };
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2)
    );
    return contacts[index];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
