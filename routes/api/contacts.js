const express = require("express");
const contactsRouter = express.Router();
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  phone: Joi.string().required(),
});

contactsRouter.get(
  "/",
  async (req, res, next) => {
    try {
      const contacts =
        await listContacts();
      res.status(200).json(contacts);
    } catch (error) {
      next(error);
    }
  }
);

contactsRouter.get(
  "/:contactId",
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact =
        await getContactById(contactId);
      if (contact) {
        res.status(200).json(contact);
      } else {
        res.status(404).json({
          message: "Not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

contactsRouter.post(
  "/",
  async (req, res, next) => {
    try {
      const { error } =
        createContactSchema.validate(
          req.body
        );
      if (error) {
        res.status(400).json({
          message:
            "missing required name field",
        });
      } else {
        const newContact =
          await addContact(req.body);
        res
          .status(201)
          .json(newContact);
      }
    } catch (error) {
      next(error);
    }
  }
);

contactsRouter.delete(
  "/:contactId",
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const removedContact =
        await removeContact(contactId);
      if (removedContact) {
        res.status(200).json({
          message: "Contact deleted",
        });
      } else {
        res.status(404).json({
          message: "Not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

contactsRouter.put(
  "/:contactId",
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const updatedContact =
        await updateContact(
          contactId,
          req.body
        );
      if (updatedContact) {
        res
          .status(200)
          .json(updatedContact);
      } else {
        res.status(404).json({
          message: "missing fields",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = contactsRouter;