const express = require("express");
const app = express();
let router = express.Router();
app.use(router);
let bodyParser = require('body-parser')
router.use(bodyParser.json())

// controller
const {signup, login, getAllCustomers} = require("../Controller/userController")

router.post('/login',login)
router.post('/signup',signup)
router.get('/get-customers', getAllCustomers)

module.exports = router;