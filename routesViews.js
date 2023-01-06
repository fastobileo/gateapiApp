const express = require("express")
const router = express.Router()
const UserController = require("./controllers/UserController")
const bodyParser = require('body-parser');

router.use(bodyParser.json())
.use(bodyParser.urlencoded({
    extended: true
}));


//Users

router.get("/register", UserController.registerView)
router.post("/register", UserController.registerPost)

module.exports = router