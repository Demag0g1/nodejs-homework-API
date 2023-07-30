const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const path = require("path");
app.use(
  express.static(
    path.join(__dirname, "public")
  )
);
app.use(express.json());
app.use(cors());

const contactsRouter = require("./routes/api");
app.use("/api", contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message:
      "Use api on routes: /api/index",
    data: "Not found",
  });
});

const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST;
mongoose.set("strictQuery", true);

const connection = mongoose.connect(
  dbHost,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

connection
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Database connection successful. Server running. Use our API on port: ${port}`
      );
    });
  })
  .catch((err) => {
    console.log(
      `Server not running. Error message: ${err.message}`
    );
    process.exit(1);
  });

app.post(
  "/send-email",
  (req, res, next) => {
    const { email, name, text } =
      req.body;
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
    const emailOptions = {
      from: "konievanatol@meta.ua",
      to: email,
      subject: "Nodemailer test",
      text: `${text}`,
    };

    transporter
      .sendMail(emailOptions)
      .then((info) =>
        res.json({
          message: "Email sent",
        })
      )
      .catch((err) => next(err));
  }
);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: "fail",
    code: err.status || 500,
    message: err.message,
    data: "Internal Server Error",
  });
});
