const express = require("express");
const connectMongoDB = require("./mongoDB_connection");
const LogReqRes = require("./middlewares");
const {userRouter,signUp} = require("./routes/user");
const signIn = require("./routes/authentication.js");
const EncryptPassword = require("./middlewares/passwordHash.js");
const userAuthCheck = require("./middlewares/authCheck.js")
const cookiesParser = require("cookie-parser")
 app = express();
require("dotenv").config()
const PORT = process.env.PORT

app.use(cookiesParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(LogReqRes("./MiddlewareLogs.txt"));

//mongoDB connection
//using mongoDB Atlas now
connectMongoDB(process.env.db_url);

//routes
app.use("/users",userAuthCheck, userRouter);
app.use("/signin",signIn);
app.use("/signup",EncryptPassword,signUp)

app.listen(PORT, () => {
  console.log(`Server started in PORT : ${PORT}`);
});
