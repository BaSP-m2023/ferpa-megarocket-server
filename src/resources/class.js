const express = require("express");
const fs = require("fs");

const classes = require("../data/class.json");
const router = express.Router();

router.get("/get", (req, res) => {
  res.status(200).json({
    data: classes,
  });
});

module.exports = router;
