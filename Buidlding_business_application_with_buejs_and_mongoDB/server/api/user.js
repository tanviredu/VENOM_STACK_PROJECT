const express    = require("express");
const bodyParser = require("body-parser");
var   router     = express.Router();
var   User       = require("../models/User");
var cors         = require("cors");
router.use(cors())
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



router.get('/user',(req,res)=>{
    User.find({}).exec()
    .then((docs)=>{
        res.status(200).json(docs)
    }).catch((err)=>{
        res.status(500).json({
            message : "Error Finding User",
            error : err
        })
    })
})








router.get('/user/:id',(req,res)=>{
        console.log(req.params.id);
        User.findById(req.params.id).exec()
        .then((docs)=>{
            res.status(200).json(docs)
        }).catch((err)=>{
            res.status(500).json({
                message : "Error Finding User",
                error : err
            })
        })
})



router.get('/user/email/:email',(req,res)=>{
    console.log(req.params.email);
    User.find({'email':req.params.email}).exec()
    .then((docs)=>{
        res.status(200).json(docs)
    }).catch((err)=>{
        res.status(500).json({
            message : "Error Finding Email",
            error : err
        })
    })
})


router.post('/user',(req,res)=>{
    let user = new User(req.body)
    user.save((err,user)=>{
        if(err){
            return {
                message : "User not created",
                error   : err
            }
        }
        res.status(200).json(user);
            
    })
})


router.put("/user/:id",(req,res)=>{
    let qry = {_id : req.params.id}
    let doc = {
        first : req.body.first,
        last : req.body.last,
        email : req.body.email,
        password : req.body.password,
        isActive : req.body.isActive
    }
    User.update(qry,doc,(err,Nres)=>{
        if(err){
            return {
                message :  "error updating value",
                error   : err
            }
        }
        res.status(200).json(Nres);
    })
});





module.exports = router