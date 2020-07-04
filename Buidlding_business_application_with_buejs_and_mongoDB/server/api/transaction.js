const express     = require("express")
const bodyParser  = require("body-parser")
var   router      = express.Router()
var   Transaction = require("../models/Transaction")
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies











module.exports = router