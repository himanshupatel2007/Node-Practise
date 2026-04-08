const mongoose = require("mongoose");
async function connectMongoDB(url){
 mongoose.connect(url).then(() => {
  console.log("mongoDB connected succesfully");
})
  .catch((err) => {
    console.log("Error connecting MongoDB", err);
  })
}


module.exports = connectMongoDB