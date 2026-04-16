const User = require("../models/user");
const fs = require("fs");
const bcrypt = require("bcrypt");
const {setUser} = require("../services/jwt.js")

async function handleUserSignIn(req, res) {
  try {
    if(!req.body.first_name || !req.body.password){
      return res.status(400).json({
        message:"Fill all the required fields properly"
      })
    }
    const { first_name, password } = req.body;

    const user = await User.findOne({ first_name });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({
        message: "User not found",
        tip: "Please check user name correctly"
      })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      fs.appendFile(
        "./userSignIn.txt",
        `${req.body.first_name} logged in the Service\n`,
        (err) => {
          if (err) {
            console.log("error writing User Login");
          }
        },
      );
     const token =  setUser({
      first_name :user.first_name,
      email : user.email,
      role: user.role
     })

      return res.status(200).cookie("token",token,{
        httpOnly:true,
        secure:true
      }).json({
        message: "User Logged in successfully",
      });
    } else {
      return res.status(400).json({
        message: "Password Incorrect",
      });
    }

  } catch (error) {
    console.log("Error user SignIn",error);
    res.status(500).json({
      message: "internal server error signing User"
    })
  }
}

module.exports = handleUserSignIn;