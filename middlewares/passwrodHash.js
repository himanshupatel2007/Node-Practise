const bcrypt = require("bcrypt")

async function EncryptPassword(req,res,next){
    
    const hashedpassword = bcrypt.hash(req.body.password);
    req.body.password = hashedpassword
    next();
}