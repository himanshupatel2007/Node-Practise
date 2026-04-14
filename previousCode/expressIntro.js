const express = require("express");
const app = express();
const PORT = 3000;

app.get("/",(req,res)=>{
  console.log("Request recieved at /")
  res.end("Response from Home page")
})
app.get("/about",(req,res)=>{
  console.log("Request recieved at /about")
  res.end("Response from about page")
})
app.get("/contact",(req,res)=>{
  console.log("Request recieved at /contact")
  res.end("Response from contact page")
})

app.listen(3000,()=>{
  console.log(`Server started at PORT:${PORT}`)
})