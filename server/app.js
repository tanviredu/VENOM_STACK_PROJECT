const express = require('express')
const app = express()
const api = require('./api')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')
const UserRouter = require('./api/routes/user')
const TransactionRouter = require('./api/routes/transaction')

// body parser configuration
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// static cpnfguration
app.use(express.static('static'))


// setting the Route
app.use('/user',UserRouter);
app.use('/transaction',TransactionRouter);


// logging configuration

app.use(morgan('dev'))



//adding the middleware to handle error
app.use((req,res,next)=>{
    const err = new Error('Something Went Wrong');
    err.status = 404
    res.json(err)
})
//database connection settings
const url = config.mongoUrl;
const connect = mongoose.connect(url,{ useUnifiedTopology: true });
connect.then((db)=>{
    console.log("connected to the database")
})



app.listen(8081)

module.exports = app;