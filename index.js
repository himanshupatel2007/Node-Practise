const http = require("http");
const fs = require("fs");
const { error } = require("console");

const myserver = http.createServer((req, res) => {
  console.log("Request recieved in the server ");
  const log = `request recieved at URL :${req.url}`;
  fs.appendFile("./information.txt", log, (error) => {
    if (error) {
      console.log("Error writing file:", error);
    }
  });
  switch (req.url) {
    case "/home":
      res.end("Response from Home Page");
      break;
    case "/about":
      res.end("Response from About page");
      break;
    case "/contact":
      res.end("response from Contact Page");
      break;

    default:
      res.end("404 Not Found");
  }
});
myserver.listen(8000, () => {
  console.log("Server Started Successfully");
});
