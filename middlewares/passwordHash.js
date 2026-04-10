const bcrypt = require("bcrypt");

async function EncryptPassword(req, res, next) {
  try {
    const password = req.body.password;
    if (password) {
      const hashedpassword = await bcrypt.hash(password,10);
      req.body.password = hashedpassword;
    } else {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    next();
  } catch (error) {
    console.log("Error Hashing Password");
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
module.exports = EncryptPassword;
