// Import User Model
const UserModel = require("../models/User");
const createError = require("http-errors");

// Initiate Menu Model
const userModel = new UserModel();

class UserApiController {
  constructor() {}
  getAllUsers(req, res) {
    let data = userModel.getAllUsers();
    res.json({
      message: "Get All User From user view",
      data,
    });
  }
  getUserById(req, res) {
    let id = req.params.id;
    let user = userModel.getUserById(id);
    if (user.length > 0) {
      res.json({
        message: `get user by id ${id}`,
        data: user,
      });
    } else {
      res.json({
        error: createError(404),
      });
    }
  }
  editUserById(req, res) {
    let id = req.params.id;
    let data = req.body;
    // console.log(id, data);
    let user = userModel.editDataUserById(id, data);
    // console.log(user);
    if (!user) {
      res.json({
        message: `edited user by id ${id}`,
        data,
      });
    } else {
      res.json({
        error: createError(404),
      });
    }
  }
  createNewUser(req, res) {
    let user = userModel.createNewUser(req.body);
    if (!user) {
      res.json({
        message: `successfully added new user`,
        data: req.body,
      });
    } else {
      res.json({
        error: response,
      });
    }
  }
  deleteUserById(req, res) {
    let id = req.params.id;
    let user = userModel.deleteDataUserById(id);
    if (!user) {
      res.json({
        message: `successfully deleted user by id ${id}`,
        data: req.body,
      });
    } else {
      res.json({
        error: createError(404),
      });
    }
  }
}

module.exports = UserApiController;
