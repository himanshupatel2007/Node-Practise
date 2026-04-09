const express = require("express");

const userRouter = express.Router();
const {
  GetAllUsers,
  GetUserById,
  CreateUser,
  UpdateUserbyID,
  DeleteUserByID,
} = require("../controllers");

userRouter.route("/").get(GetAllUsers).post(CreateUser);

userRouter
  .route("/:id")
  .get(GetUserById)
  .patch(UpdateUserbyID)
  .delete(DeleteUserByID);

module.exports = userRouter;
