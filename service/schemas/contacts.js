const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [
        true,
        "Set name for contact",
      ],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false }
);

const Contact = mongoose.model(
  'Contact',
  contactSchema
);
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateFavoriteSchema = Joi.object(
  {
    favorite: Joi.boolean().required(),
  }
);

module.exports = {
  Contact,
  addSchema,
  updateFavoriteSchema,
};
