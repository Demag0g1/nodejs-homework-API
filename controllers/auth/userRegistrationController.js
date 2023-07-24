const bcrypt = require("bcrypt");
const User = require("../../service");
const Joi = require("joi");

const registrationValidation =
  Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
  });

const registerUser = async (
  req,
  res
) => {
  try {
    const { error } =
      registrationValidation.validate(
        req.body
      );

    if (error) {
      return res.status(400).json({
        message:
          "Registration validation error",
        error: error.details[0].message,
      });
    }

    const { email, password } =
      req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email in use",
      });
    }

    const saltRounds = 10;
    const hashedPassword =
      await bcrypt.hash(
        password,
        saltRounds
      );

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      user: {
        email: newUser.email,
        subscription:
          newUser.subscription,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  registerUser,
};
