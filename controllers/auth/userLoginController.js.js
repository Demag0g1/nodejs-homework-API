const bcrypt = require("bcrypt");
const User = require("../../service/schemas/users");
const generateToken = require("../../");
const Joi = require("joi");

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginUser = async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({
          message: "Login validation error",
          error: error.details[0].message,
        });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = generateToken(user._id);
    user.token = token;
    await user.save();

    return res.json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  loginUser,
};
