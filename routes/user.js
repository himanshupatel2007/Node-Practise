const express = require("express")

const userRouter = express.Router();
const {
    GetAllUsers,
    GetUserById,
    CreateUser } = require("../controllers")

userRouter
    .route("/")
    .get(GetAllUsers)
    .post(CreateUser);

userRouter.get("/:id", GetUserById);


module.exports = userRouter