const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/users", (req, res) => {
  fs.readFile("./MOCK_DATA.json", "utf-8", (err, data) => {
    if (err) {
      console.log("Error Reading files:", err)
    }
    if (data) {

      res.send(JSON.parse(data));
    }
    else {

      res.send("Users are Unavailable")
    }
  })
  fs.appendFile("./logFile", `${req.method} ${req.url} ${Date.now()}\n`, (err) => {
    if(err)
    console.log("Error appending log data to the file")
  });
});

app.get('/users/:id', (req, res) => {
  fs.appendFile("./logFileUsers", `${req.method} ${req.url} ${Date.now()}\n`,(err)=>{
    if(err)
    console.log("Error writing logs",err)
  });
  fs.readFile("./MOCK_DATA.json", "utf-8", (err, data) => {
    if (err) {
      res.send("User not found")
    }
    let Users = JSON.parse(data)
      const userID = req.params.id;
      const userData = Users.find((User) => User.id == userID);
      if(userData)
      res.json(userData)
    else
      res.send("User Not Found")
  })

});

app.post("/users", (req, res) => {
  const Data = req.body;
  fs.readFile("./MOCK_DATA.json", "utf-8", (err, user) => {
    if (err) {
      console.log("Error Writing user's Data in the databse")
    }
    let userData = [];
    userData = JSON.parse(user)
    userData.push(Data);
    fs.writeFile("./MOCK_DATA.json", userData, (err) => {
      console.log("Erro Writing IFel :", err)
    })
  })
});

app.listen(PORT, () => {
  console.log(`Serve started in PORT : ${PORT}`);
});
