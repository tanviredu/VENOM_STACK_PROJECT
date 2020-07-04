const express           = require("express");
const bodyParser        = require("body-parser");
const mongoose          = require("mongoose")
var   router            = express.Router();
var   Transaction       = require("../models/Transaction");
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies





router.get('/alltransaction',(req,res)=>{
    Transaction.find({}).exec()
    .then((docs)=>{
        res.status(200).json(docs)
    }).catch((err)=>{
        res.status(500).json({
            message : "Error Finding User",
            error : err
        })
    })
})






router.get('/:year/:month', function (req, res) {
    
    const userId = req.get('userId')   // you will get it from the Header of thefile
    const month = req.params.month - 1 // JS months are zero-based
    const year = req.params.year
    const startDt = new Date(Date.UTC(year, month, 1, 0, 0, 0))
    const endDt = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0))

    const qry = {
      userId: userId,
      transactionDate: {
        $gte: startDt,
        $lt: endDt
      }
    }
    Transaction.find(qry)
      .sort({ 'transactionDate': 1 })
      .exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding transactions for user',
          error: err
        }))
  })

  // Get transactions running balance for a specific user...
  router.get('/balance/:year/:month', function (req, res) {
    // YOU NEED TO PASS IT ON A HEADER
    const userId = req.get('userId') // you will get it from the Header of thefile
    const month = req.params.month - 1 // JS months are zero-based
    const year = req.params.year
    const endDt = new Date(Date.UTC(year, month, 1))
    const pipeline = [
      {

        //   find the match
        $match: {
          userId: mongoose.Types.ObjectId(userId)
        }
      },
      {
        //   also find the match
        $match: {
          transactionDate: { $lt: endDt }
        }
      },
      {
        //   group the result
        $group: {
          _id: null,
          charges: { $sum: '$charge' },
          deposits: { $sum: '$deposit' }
        }
      }
    ]

    //  run all the query in the pipeline
    Transaction.aggregate(pipeline).exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding transactions for user',
          error: err
        }))
  })

  // Create new transaction document...
  router.post('/transaction', function (req, res) {
    let transaction = new Transaction(req.body)
    transaction.save(function (err, transaction) {
      if (err) return console.log(err)
      res.status(200).json(transaction)
    })
  })
  module.exports = router