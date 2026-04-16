const User = require("../models/user");
const fs = require("fs");
const bcrypt = require("bcrypt");

async function GetAllUsers(req, res) {
  try {
    fs.appendFile(
      "./logFile.txt",
      `${req.method} ${req.url} ${new Date().toISOString()}\n`,
      (err) => {
        if (err) console.log("Error appending log data to the file");
      },
    );
    const Users = await User.find({});
    if (!Users.length === 0) {
      return res.status(200).json(Users);
    } else {
      return res.status(404).json({
        message: "Users Not exists",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server errror",
    });
  }
}

async function CreateUser(req, res) {
  try {
    const data = req.body;
    if (!data.first_name || !data.password || !data.age || !data.job_title) {
      return res.status(400).json({
        Error: "Fill all the requied entries",
      });
    }
    const result = await User.create(data);
    console.log(`user created with data ${result}`);
    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
async function GetUserById(req, res) {
  try {
    fs.appendFile(
      "./logFileUsers.txt",
      `${req.method} ${req.url} ${Date.now()}\n`,
      (err) => {
        if (err) console.log("Error writing logs", err);
      },
    );
    const userData = await User.findById(req.params.id);
    if (userData) {
      return res.status(200).json(userData);
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log("Error geting user by id", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
async function UpdateUserbyID(req, res) {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(`User updated by ID :${req.params.id} : ${result}`);
    res.status(200).json({
      message: "User Updated succesfully ",
      data: result,
    });
  } catch (error) {
    console.log("Error Updatating User Please try agian");
    return res.status(500).json({
      message: "Unable to Update user",
    });
  }
}
async function DeleteUserByID(req, res) {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    fs.appendFile(
      "./UserDeleteLog.txt",
      `${req.params.id} User Deleted ${result}`,
      (err) => {
        if (err) {
          console.log("Error deleting User By ID : " + req.params.id);
          fs.appendFile("./Error.txt", `${req.url} ${req.params.id}`);
        }
      },
    );
    res.status(200).json({
      message: "User delted successfully",
    });
  } catch (error) {
    console.log("Error Deleting User by Id" + req.params.id);
    res.status(500).json({
      message: "User deletion unsuccessfull",
    });
  }
}
module.exports = {
  GetAllUsers,
  GetUserById,
  CreateUser,
  UpdateUserbyID,
  DeleteUserByID,
};
