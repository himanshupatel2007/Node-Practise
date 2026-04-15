const express = require("express");
const multer = require("multer")
require("dotenv").config()
const cookiesParser = require("cookie-parser")
const upload = multer({dest:"uploads/"})

const connectMongoDB = require("./mongoDB_connection");

const LogReqRes = require("./middlewares");
const EncryptPassword = require("./middlewares/passwordHash.js");
const userAuthCheck = require("./middlewares/authCheck.js");

const fileRouter = require("./routes/fileUpload.js")
const {userRouter,signUp} = require("./routes/user");
const signIn = require("./routes/authentication.js");

const PORT = process.env.PORT

const app = express();
app.use(cookiesParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(LogReqRes());

//mongoDB connection
//using mongoDB Atlas now
connectMongoDB(process.env.db_url);

//routes
app.use("/users",userAuthCheck, userRouter);
app.use("/signin",signIn);
app.use("/signup",EncryptPassword,signUp);
app.use("/upload",upload.single("profileImage"),fileRouter)

app.listen(PORT, () => {
  console.log(`Server started in PORT : ${PORT}`);
});
