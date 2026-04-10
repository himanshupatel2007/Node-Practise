const jwt = require("jsonwebtoken")

function setUser(UserData){
    const token = jwt.sign({
        first_name : UserData.first_name,
        email:UserData.email
    },process.env.secret_key)

    return token;
}

function verifyUser(token){
    if(!token){
return res.status(400).json({
    message:"User nto verified ",
    tip:"please login to access hte service"
})
    }
    const isVerified = jwt.verify(token,process.env.secret_key)
    if(isVerified){
        return 1;
    }
    else{
        return -1;
    }
}

module.exports = {
    setUser,
    verifyUser
}