const fs = require("fs")

function handleFileUpload(req, res) {
    fs.appendFile("./fileUploads.txt", `${JSON.stringify(req.file)}- ${new Date().toISOString()}`,(err)=>{
        if(err)
            console.log("Error logging Upload Log")
        console.log("Error File upload Log");
    });
    res.status(201).json({
        message:"Succesfully Uploaded File"
    })

}

module.exports = handleFileUpload;