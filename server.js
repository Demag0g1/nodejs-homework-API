const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const contactsRouter = require("./routes/api");
app.use(
  "./service/schemas/contacts.js",
  contactsRouter
);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message:
      "Use api on routes: /api/index",
    data: "Not found",
  });
});
app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

const formatsLogger =
  app.get("env") === "development"
    ? "dev"
    : "short";
app.use(logger(formatsLogger));

const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST;
mongoose.set("strictQuery", true);

mongoose
  .connect(dbHost)
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
