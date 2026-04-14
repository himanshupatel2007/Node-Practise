const express = require("express");

const signIn = express.Router();

const HandleUserSingin = require("../controllers/authentication.js");
signIn.post("/", HandleUserSingin);

module.exports = signIn