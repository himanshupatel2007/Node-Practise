const User = require("../models/user");
const fs = require("fs");
const bcrypt = require("bcrypt")

async function handleUserSignIn(req,res){
    const {id,password} = req.body;

const user = await User.findById(id,(err)=>{
    return res.status(400).json({
        message :"User not found "
    })
})
const isMatch = await bcrypt.compare(user.password,password)
if(isMatch)
{fs.appendFile("../userSignIn.txt",`${req.body.id} logged in the Service`,(err)=>{
    if(err){
        console.log("error writing User Login")
    }
})
    return res.status(200).json({
        message :"User Logged in successfully"
    })

}
else{
    return res.status(400).json({
        message:"Password Incorrect"
    })
}
}

module.exports = handleUserSignIn