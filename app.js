const express = require("express");
const app = express();
require('dotenv').config()
const mongoose = require("mongoose");
const PORT =process.env.PORT ||  5000;
const route = require("./routes/routes");


app.use(express.json({limit:'100mb'}));
app.use("/", route);

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected To MongoDB");
  
});
if (process.env.NODE_ENV == "production")
{
  app.use(express.static('client/build'))
  const path = require('path')
  app.get("*",(req,res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}
app.listen(PORT, () => {
  console.log("Server Listening On Port: ", PORT);
});
