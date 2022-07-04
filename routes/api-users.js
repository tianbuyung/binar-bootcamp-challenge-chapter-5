const express = require("express");
const router = express.Router();
const UserApiController = require("../controllers/userApiController");

const userApiController = new UserApiController();

router.get("/", userApiController.getAllUsers);
router.post("/", userApiController.createNewUser);
router.get("/:id", userApiController.getUserById);
router.put("/:id", userApiController.editUserById);
router.delete("/:id", userApiController.deleteUserById);

module.exports = router;
