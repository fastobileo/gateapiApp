const UserController = require("./UserController")
const Notification = require("../models/Notification");
const NotificationController = require("../controllers/NotificationController")
const Device = require("../models/Device");
const superagent = require('superagent');

async function createDevice(req, res) {
    UserController.UserIsAdmin(res.locals.user, res)
    try {
        let notifications = [];
        req.body.notifications.forEach(async notificationName => {
            await Notification.findOne({ "name": notificationName.name }).then(function (notification) {
                if (notification) {
                    notifications.push(notification.id);
                }
                var device = new Device({
                    name: req.body.name,
                    baseUrl: req.body.baseUrl,
                    header: req.body.header,
                    body: req.body.body,
                    notifications: notifications
                })
                device.save();
                return res.send(device);
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: error });
    }
}
async function getAllDevices(req, res) {
    UserController.UserIsAdmin(res.locals.user, res)
    var devices = await Device.find().populate('notifications');
    res.send(devices)
}
async function getDeviceByName(req, res) {
    UserController.UserIsAdmin(res.locals.user, res)
    var devices = await Device.findOne(({ name: req.params.name })).populate("notifications");
    res.send(devices)
}

async function actionDevice(req, res) {
    await Device.findOne(({ name: req.params.name })).populate("notifications").then(function (device) {
        const getter = superagent.post(device.baseUrl);
        for (let deviceHeader in device.header) {
            getter.set(deviceHeader, device.header[deviceHeader])
        }
        getter.send(device.body)
        getter.then(function (recive) {
            if (recive.status === 200) {
                device.notifications.forEach(function (notification) {
                    NotificationController.notify(notification.name, res.locals.user)
                })
                res.send(recive.body)
            }
        }
        ).catch(function (error) {
            res.send(error)
        });
    })
}

module.exports.createDevice = createDevice;
module.exports.getAllDevices = getAllDevices;
module.exports.getDeviceByName = getDeviceByName;
module.exports.actionDevice = actionDevice;

