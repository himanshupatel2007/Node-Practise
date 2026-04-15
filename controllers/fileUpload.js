const fs = require("fs")

function handleFileUpload(req, res) {
    fs.appendFile("../Logs/fileUploads.txt", `${req.file}- ${new Date().toISOString()}`,(err)=>{
        console.log("Error File upload Log");
    });
    res.status(201).json({
        message:"Succesfully Uploaded File"
    })

}

module.exports = handleFileUpload;