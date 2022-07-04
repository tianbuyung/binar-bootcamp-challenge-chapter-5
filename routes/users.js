const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

const userController = new UserController();

// GET register page
router.get("/register", userController.getRegisterPage);
// GET login page
router.get("/login", userController.getLoginPage);
// POST create new user
router.post("/register", userController.createNewUser);
// POST login user
router.post("/login", userController.loginUser);

module.exports = router;
