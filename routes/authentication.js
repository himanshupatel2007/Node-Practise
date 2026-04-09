const express = require("express")

const signIn = express.Router();

const HandleUserSingin = require("../controllers/authentication.js")
signUP.post("/",HandleUserSingin)