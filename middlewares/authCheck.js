const {verifyUser} = require("../services/jwt.js")
async function userAuthCheck(req,res,next){
    const token = req.headers.authentication;
    if(!token){
        res.status(400).json({
            message:"User not logged in",
            tip:"please sign up to access apis"
        })
    };
    const isLoggedIn = await verifyUser(token);
    if(isLoggedIn)
    {
        next();
    }
    else{
        return res.status(400).json({
            message:"User not logged in "
        })
    }
}

module.exports = userAuthCheck
