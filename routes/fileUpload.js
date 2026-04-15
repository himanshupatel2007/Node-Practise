const express = require("express")
const handleFileUpload = require("../controllers/fileUpload")
const fileRouter = express.Router()

fileRouter.post("/",handleFileUpload);

module.exports = fileRouter;