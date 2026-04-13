const express = require("express");
const authorizationcheck = require("../middlewares/authorization")
const userRouter = express.Router();
const signUp = express.Router();
const {
  GetAllUsers,
  GetUserById,
  CreateUser,
  UpdateUserbyID,
  DeleteUserByID,
} = require("../controllers");

userRouter.get("/",authorizationcheck(["ADMIN"]),GetAllUsers)
signUp.post("/",CreateUser);

userRouter
  .route("/:id")
  .get(authorizationcheck(["ADMIN","USER"]),GetUserById)
  .patch(authorizationcheck(["ADMIN","USER"]),UpdateUserbyID)
  .delete(authorizationcheck(["ADMIN","USER"]),DeleteUserByID);

module.exports = {
  userRouter,signUp
}
