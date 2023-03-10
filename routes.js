const express = require("express")
const UserController = require("./controllers/UserController")
const NotificationController = require("./controllers/NotificationController")
const DeviceController = require("./controllers/DeviceController")
const User = require("./models/User")
const router = express.Router()
// const bodyParser = require('body-parser');

// router.use(bodyParser.json())
// .use(bodyParser.urlencoded({
//     extended: true
// }));

//Users
router.get("/users", UserController.authentificate, UserController.getAllUsers)
router.get("/users/:username",UserController.authentificate,UserController.getUserByName)
router.post("/users", UserController.authentificate , UserController.createUserAdmin)
router.post("/createUser", UserController.createUser)

//Notifications
router.get("/notifications", UserController.authentificate , NotificationController.getAllNotifications)
router.get("/notifications/:name", UserController.authentificate , NotificationController.getNotificationByName)
router.post("/notifications", UserController.authentificate , NotificationController.createNotification)

//Devices
router.post("/Devices", UserController.authentificate , DeviceController.createDevice)
router.get("/Devices", UserController.authentificate , DeviceController.getAllDevices)
router.get("/Devices/:name", UserController.authentificate , DeviceController.getDeviceByName)
router.get("/Devices/:name/open", UserController.authentificate , DeviceController.actionDevice)

module.exports = router