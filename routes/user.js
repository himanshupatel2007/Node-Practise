const express = require("express");

const userRouter = express.Router();
const signUp = express()
const {
  GetAllUsers,
  GetUserById,
  CreateUser,
  UpdateUserbyID,
  DeleteUserByID,
} = require("../controllers");

userRouter.get("/",GetAllUsers)

signUp.post("/",CreateUser);

userRouter
  .route("/:id")
  .get(GetUserById)
  .patch(UpdateUserbyID)
  .delete(DeleteUserByID);

module.exports = {
  userRouter,signUp
};
