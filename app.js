const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const gameRouter = require("./routes/game");
const usersRouter = require("./routes/users");
const usersApiRouter = require("./routes/usersApi");

// import middleware
const clientError = require("./middleware/clientError");
const serverError = require("./middleware/serverError");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/game", gameRouter);
app.use("/users", usersRouter);
app.use("/api/users", usersApiRouter);

app.use(clientError.errorNotFound);
app.use(serverError.server);

require("dotenv").config();

module.exports = app;
