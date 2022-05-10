const res = require("express/lib/response");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/About", (req, res) => {
  res.render("about");
});

module.exports = router;
