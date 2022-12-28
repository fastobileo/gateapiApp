const Notification = require("../models/Notification");
const superagent = require('superagent');
const UserController = require("./UserController")

async function getAllNotifications(req, res) {
    UserController.UserIsAdmin(res.locals.user, res)
    var notification = await Notification.find()
    res.send(notification)
}

async function getNotificationByName(req, res) {
    UserController.UserIsAdmin(res.locals.user, res)
    var notification = await Notification.findOne({ name: req.params.name }).exec();
    if (!notification) {
        return res.status(400).send({ message: "Impossible to find this notification" });
    }
    notify("iphoneLeo", res.locals.user)
    res.send(notification)
}

async function createNotification(req, res) {
    UserController.UserIsAdmin(res.locals.user, res)
    try {
        var notification = new Notification({
            name: req.body.name,
            token: req.body.token,
            type: req.body.type,
        })
        await notification.save();
    } catch (error) {
        return res.status(400).send({ message: error });
    }
    return res.send(notification);
}

async function notify(NotificationName, pressUser) {
    var notification = await Notification.findOne({ name: NotificationName }).exec();
    if (!notification) {
        return res.status(400).send({ message: "Impossible to notify" });
    }
    if (notification.type === "Alertzy") {
        superagent.get('https://alertzy.app/send')
            .query({ 
                accountKey: notification.token, 
                title: 'Ouverture du portail !', message: pressUser.firstName + " " + pressUser.name + " à ouvert le protail"
            })
            .end((err, res) => {
                if (err) { return console.log(err); }
                console.log(res.body.response);
            });
    }
    return;
}

module.exports.getAllNotifications = getAllNotifications;
module.exports.getNotificationByName = getNotificationByName;
module.exports.createNotification = createNotification;
module.exports.notify = notify;

