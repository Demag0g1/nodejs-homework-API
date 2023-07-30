const User = require("../models/user");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

const userAuthController = {
  verifyEmail: async (req, res) => {
    const { verificationToken } =
      req.params;

    try {
      const user = await User.findOne({
        verificationToken,
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      user.verificationToken = null;
      user.verify = true;
      await user.save();

      return res.status(200).json({
        message:
          "Verification successful",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },

  resendVerificationEmail: async (
    req,
    res
  ) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message:
          "missing required field email",
      });
    }

    try {
      const user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (user.verify) {
        return res.status(400).json({
          message:
            "Verification has already been passed",
        });
      }

      const verificationToken =
        uuidv4();
      user.verificationToken =
        verificationToken;
      await user.save();
      require("dotenv").config();
      const config = {
        host: "smtp.meta.ua",
        port: 465,
        secure: true,
        auth: {
          user: "konievanatol@meta.ua",
          pass: process.env.PASSWORD,
        },
      };
      const transporter =
        nodemailer.createTransport(
          config
        );
      const verificationLink = `http://localhost:3000/users/verify/${verificationToken}`;

      const mailOptions = {
        from: "konievanatol@meta.ua",
        subject: "Email Verification",
        text: `Click on the link to verify your email: ${verificationLink}`,
      };

      transporter.sendMail(
        mailOptions,
        (error, info) => {
          if (error) {
            console.log(
              "Error sending email:",
              error
            );
          } else {
            console.log(
              "Email sent:",
              info.response
            );
          }
        }
      );

      return res.status(200).json({
        message:
          "Verification email sent",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
};

module.exports = userAuthController;
