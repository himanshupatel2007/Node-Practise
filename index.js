const  fs = require("fs") 
console.log("server started")


fs.writeFile("./information.txt","Hello from Nodejs",(error)=>{
    if(error){
        console.log("Error writing file")
    }
    else{
        console.log("File written successfully")
    }
})

fs.writeFileSync("./information.txt","Hello from Nodejs")
fs.appendFile("./information.txt","Bye from NodeJs",(error)=>{
    if(error)
    {
        console.log("Error writing file")
    }
    else{
        console.log("file written successfully")
    }
})
const result = fs.readFileSync("./contact.txt","utf-8")
console.log(result)