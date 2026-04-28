import express from "express";
import multer from "multer"
import "dotenv/config.js"
import cookiesParser from "cookie-parser"
const upload = multer({dest:"uploads/"})

import connectMongoDB  from "./mongoDB_connection.js";

import LogReqRes from "./middlewares/index.js"
import EncryptPassword  from "middlewares/passwordHash.js";
import userAuthCheck from "./middlewares/authCheck.js";

import fileRouter from "./routes/fileUpload.js"
import {userRouter,signUp} from "./routes/user.js";
import signIn from "./routes/authentication.js";

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
