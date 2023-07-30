const mongoose = require("mongoose");
const gravatar = require("gravatar");

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
  avatarURL: String,
});

userSchema.pre("save", function (next) {
  if (!this.avatarURL) {
    this.avatarURL = gravatar.url(this.email, {
      s: "200",
      r: "pg",
      d: "identicon",
    });
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
