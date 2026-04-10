const User = require("../models/user");
const fs = require("fs");
const bcrypt = require("bcrypt");

async function handleUserSignIn(req, res) {
 try {
     const { first_name, password } = req.body;

  const user = await User.findOne({first_name});
  if(!user){
    console.log("User not found");
    return res.status(404).json({
        message:"User not found",
        tip:"Please check user name correctly"
    })
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    fs.appendFile(
      "./userSignIn.txt",
      `${req.body.first_name} logged in the Service`,
      (err) => {
        if (err) {
          console.log("error writing User Login");
        }
      },
    );
    return res.status(200).json({
      message: "User Logged in successfully",
    });
  } else {
    return res.status(400).json({
      message: "Password Incorrect",
    });
  }
    
 } catch (error) {
    console.log("Error user SignIn");
    res.status(500).json({
        message:"internal server error signing User"
    })
 }
}

module.exports = handleUserSignIn;
