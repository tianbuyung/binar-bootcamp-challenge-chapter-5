const express = require("express");
const router = express.Router();

/* GET game page. */
router.get("/", function (req, res, next) {
  res.render("pages/game", { title: "Rock, Paper, Scissors Game" });
});

module.exports = router;
