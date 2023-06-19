require("./connection");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/router");
const logger = require("./middleware/logger");
const notFound = require("./middleware/404");

const app = express();

app.use(cors());
app.options("*", cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);
app.use(notFound);

app.listen(3001, () =>
  console.log("Server is running on port http://localhost:3001/")
);
