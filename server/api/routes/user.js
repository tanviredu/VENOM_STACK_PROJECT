const express = require('express')
const user = express.Router()
const User = require('../../models/users')


user.get('/',(req,res,next)=>{
    // get the user based on the id
    User.find({}).exec()
    .then((user)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(user);
    },(err)=>next(err)).catch((err)=>next(err));
})

user.post('/',(req,res,next)=>{
    User.create(req.body)
    .then((user)=>{
        console.log("user is created");
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(user)
    }).catch((err)=>{
        res.statusCode = 500
        res.json({"Error":"Something Went Wrong"})
    })
})

// dishRouter.get('/:id',(req,res,next)=>{
//     // get the user based on the id
//     User.findById(req.params.id).exec()
//     .then((user)=>{
//         res.statusCode = 200;
//         res.setHeader('Content-Type','application/json');
//         res.json(user);
//     },(err)=>next(err)).catch((err)=>next(err));
// })


user.get('/:id',(req,res,next)=>{
    // get the requested user
    User.findById(req.params.id).exec()
    .then((user)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(user)

    }).catch((err)=>{
        res.statusCode = 500
        res.json({"Error":"User Does not exists"})
    })
})

user.get('/email/:email',(req,res,next)=>{
    // get the requested user
    // cant do it with findById
    User.find({"email":req.params.email}).exec()
    .then((user)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(user)

    }).catch((err)=>{
        res.statusCode = 500
        res.json({"Error":"User Does not exists"})
    })
})


// we will not give the permission to update
// everything 


user.put('/:id',(req,res)=>{
    //console.log(req.body);
    // set the query parameter
    let query = {_id:req.params.id}
    //we are only take the isAactive parameter
    let doc = {
        isActive:req.body.isActive
    }
    //console.log(doc);
    // this is the update function
    // it takes three parameter
    // search parameter
    // updated data
    // callback function
    User.update(query,doc,(err,data)=>{
        res.setHeader('Content-Type','application/json')
        res.json(data)

    })

})












module.exports = user;