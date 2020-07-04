const express    = require("express");
const bodyParser = require("body-parser");
const morgan            = require("morgan");
const cors              = require("cors");
const mongoose          = require("mongoose");
const config            = require("./config");
const userRouter        = require("./api/user");
const transactionRouter = require("./api/transaction");

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(cors());
app.use(morgan("dev"))
app.use(express.static("static"))



// route goes here 
app.use('/api',userRouter);
app.use('/',transactionRouter);



// make a final error handler
app.use(function(req,res,next){
    const err = new Error("Not Found");
    err.status = 404;
    res.json(err);
})


// making database connection
const url = config.mongoUrl
const PORT = 8000;
const connect = mongoose.connect(url);
connect.then((db)=>{
    console.log("[+] CONNECTED TO THE DATABASE");
    console.log("[*] STARTING THE SERVER......");
    app.listen(PORT,()=>{
        console.log(`[+] SERVER STARTED ON PORT ${PORT}`);
    })
})
