const User = require("../models/user");
const fs = require("fs");
const bcrypt = require("bcrypt");
const {setUser} = require("../services/jwt.js")

async function handleUserSignIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Fill all required fields properly",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Password Incorrect",
      });
    }

    fs.appendFile(
      "./userSignIn.txt",
      `${user.email} logged in\n`,
      () => {}
    );

    const token = setUser({
      first_name: user.first_name,
      email: user.email,
      role: user.role,
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
      .json({
        message: "User Logged in successfully",
      });

  } catch (error) {
    console.log("Error user SignIn", error);
    res.status(500).json({
      message: "Internal server error during sign-in",
    });
  }
}

module.exports = handleUserSignIn;