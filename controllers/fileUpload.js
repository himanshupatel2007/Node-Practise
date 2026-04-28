const fs = require("fs")

function handleFileUpload(req, res) {
    if(!req.file){
        return res.status(400).json({
            message:"please send a file"
        })
    }
    fs.appendFile("./fileUploads.txt", `${JSON.stringify(req.file)}- ${new Date().toISOString()}\n`,(err)=>{
        if(err)
            console.log("Error logging Upload Log")
    });
    res.status(201).json({
        message:"Succesfully Uploaded File"
    })

}

module.exports = handleFileUpload;