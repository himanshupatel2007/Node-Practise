const jwt = require("jsonwebtoken")
function authorizationCheck(roles = []) {
    function check(req, res, next) {
        const tokenValue = jwt.decode(req.cookies.token);
        const userRole = tokenValue.role;
        if(roles.includes(userRole)){
            next();
        }
        else{
            return res.status(401).json({
                message:"Unauthorized to access the Service"
            })
        }
    }
    return check;

}

module.exports = authorizationCheck;