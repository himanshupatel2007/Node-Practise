const User = require("../models/user")
const fs = require("fs")

async function GetAllUsers(req, res) {
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
            return res.status(200).json(Users);
        } else {
            return res.status(404).json({
                message: "Users Not exists",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server errror",
        });
    }
}

async function CreateUser(req, res) {
    try {
        const data = req.body;
        if (!data.first_name || !data.gender || !data.age || !data.job_title) {
            return res.status(400).json({
                Error: "Fill all the requied entries",
            });
        }
        const result = await User.create(data);
        console.log(`user created with data ${result}`);
        return res.status(201).json({
            message: "User created successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}
async function GetUserById(req, res) {
    try {
        fs.appendFile(
            "./logFileUsers",
            `${req.method} ${req.url} ${Date.now()}\n`,
            (err) => {
                if (err) console.log("Error writing logs", err);
            },
        );
        const userData = await User.findById(req.params.id);
        if (userData) {
            return res.status(200).json(userData);
        } else {
            return res.status(404).json({
                message: "User not found",
            });
        }
    } catch (error) {
        console.log("Error geting user by id", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
module.exports = {
    GetAllUsers,
    GetUserById,
    CreateUser
}