const bcrypt = require("bcrypt");
const User = require("../../service");
const {
  registrationSchema,
} = require("../../service/schemas/joi/userValidation");
const gravatar = require("gravatar");
const path = require("path");
const jimp = require("jimp");
const fs = require("fs");

const registerUser = async (req, res) => {
  try {
    const { err } = registrationSchema.validate(req.body);

    if (err) {
      return res.status(400).json({
        message: "Registration validation error",
        error: err.details[0].message,
      });
    }

    const { email, password } = req.body;

    const avatarURL = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email in use",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      password: hashedPassword,
      avatarURL,
    });

    await newUser.save();

    return res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const user = req.user;
    if (!req.file) {
      return res.status(400).json({
        message: "Avatar image not provided",
      });
    }
    const filePath = req.file.path;
    const image = await jimp.read(filePath);
    await image.cover(250, 250).write(filePath);
    const fileName = `${user._id}${path.extname(req.file.originalname)}`;
    const publicFilePath = path.join("public", "avatars", fileName);
    await fs.rename(filePath, publicFilePath);
    user.avatarURL = `/avatars/${fileName}`;
    await user.save();

    return res.json({
      avatarURL: user.avatarURL,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  registerUser,
  updateAvatar,
};
