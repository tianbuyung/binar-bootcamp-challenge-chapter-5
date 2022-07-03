// Import User Model
const UserModel = require("../models/User");
const createError = require("http-errors");

// Initiate Menu Model
const userModel = new UserModel();

class UserController {
  constructor() {}
  getRegisterPage(req, res) {
    res.render("pages/register", { title: "Sign up" });
  }
  getLoginPage(req, res) {
    res.render("pages/login", { title: "Sign in" });
  }
  createNewUser(req, res) {
    userModel.createNewUser(req.body);
    res.redirect("/users/login");
  }
  loginUser(req, res, next) {
    console.log(req.body);
    let response = userModel.checkDataUser(req.body);
    if (response.length > 0) {
      res.redirect("/game");
    } else {
      next(createError(401));
    }
  }
}

module.exports = UserController;
