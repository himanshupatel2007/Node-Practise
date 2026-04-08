const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// schema defining
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
  job_title: {
    type: String,
    required: true,
  },
});

//mongoDB connection
const User = mongoose.model("userData", userSchema);

mongoose
  .connect("mongodb://127.0.0.1:27017/userData")
  .then(() => {
    console.log("mongoDB connected succesfully");
  })
  .catch((err) => {
    console.log("Error connecting MongoDB", err);
  });

app.use((req, res, next) => {
  fs.appendFile(
    "./Middlewareslog.txt",
    `${Date.now()} request resolved by hte middleware of ${req.method}\n`,
    (err) => {
      if (err) {
        console.log(`Error:${err}`);
      }
    },
  );
  next();
});

app.get("/users", async (req, res) => {
  try {
    fs.appendFile(
      "./logFile",
      `${req.method} ${req.url} ${Date.now()}\n`,
      (err) => {
        if (err) console.log("Error appending log data to the file");
      },
    );
    const Users = await User.find({});
    if (Users) {
      res.status(200).json(Users);
    } else {
      res.status(404).json({
        message: "Users Not exists",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server errror",
    });
  }
});

app.get("/users/:id", async (req, res) => {
  fs.appendFile(
    "./logFileUsers",
    `${req.method} ${req.url} ${Date.now()}\n`,
    (err) => {
      if (err) console.log("Error writing logs", err);
    },
  );
  const userData = await User.findById(req.params.id);
  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

app.post("/users", async (req, res) => {
  try {
    const data = req.body;
    if (!data.first_name || !data.gender || !data.age || !data.job_title) {
      return res.status(400).json({
        Error: "Fill all the requied entries",
      });
    }
    const result = await User.create({
      first_name: data.first_name,
      last_name: data.last_name,
      age: data.age,
      gender: data.gender,
      job_title: data.job_title,
    });
    console.log(`user created with data ${result}`);
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started in PORT : ${PORT}`);
});
