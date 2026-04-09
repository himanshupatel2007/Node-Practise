const User = require("../models/user")
const fs = require("fs");

async function handleUserSignIn(req,res){

const Id = User.findById(req.prams.id,(err)=>{
    return res.status(400).json({
        message :"User not found "
    })
})
if(Id.password === req.params.password)
{fs.appendFile("../userSignIn",`${req.params.id} logged in the Service`,(err)=>{
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