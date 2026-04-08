const express = require("express");
const connectMongoDB  = require("./mongoDB_connection");
const LogReqRes = require("./middlewares");
const userRouter = require("./routes/user")

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(LogReqRes("./MiddlewareLogs.txt"));

//mongoDB connection
connectMongoDB("mongodb://127.0.0.1:27017/userData")

//routes
app.use('/users',userRouter)

app.listen(PORT, () => {
  console.log(`Server started in PORT : ${PORT}`);
});
