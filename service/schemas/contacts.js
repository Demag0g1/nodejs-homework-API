const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Contact = new Schema(
    {
        name: {
          type: String,
          required: [true, 'Set name for contact'],
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
      }

);

const contacts = mongoose.model("contacts", Contact);

module.exports = contacts;
