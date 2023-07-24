const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const usersSchema = new Schema(
{
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
       token: String,
    
  });

  const User = mongoose.model(
    "users",
    usersSchema
  );
  const addSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string().required(),
  });



  
  module.exports = {
    User,
    addSchema,
};
