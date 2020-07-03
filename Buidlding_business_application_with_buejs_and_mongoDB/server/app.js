const express    = require("express");
const bodyParser = require("body-parser");
const morgan     = require("morgan");
const cors       = require("cors");
const mongoose   = require("mongoose");
const config     = require("./config");


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(cors());
app.use(morgan("dev"))
app.use(express.static("static"))


// make a final error handler
app.use(function(req,res,next){
    const err = new Error("Not Found");
    err.status = 404;
    res.json(err);
})


// making database connection
const url = config.mongoUrl
const connect = mongoose.connect(url);
connect.then((db)=>{
    console.log("[+] CONNECTED TO THE DATABASE");
    console.log("[*] STARTING THE SERVER......");
    app.listen(8000,()=>{
        console.log("[+] SERVER STARTED");
    })
})
