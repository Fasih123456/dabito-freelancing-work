const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
require("dotenv").config();

//This class handles all User related routes but some routes are being handled in OAuth

router.get("/hasAdminPrivileges/:id", (req, res, next) => {
  const id = req.params.id.substring(0, 8);
  console.log(id);

  Users.hasAdminPrivileges(id).then((response) => {
    res.status(200).json(response);
  });
});

module.exports = router;
