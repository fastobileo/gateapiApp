const User  = require("../models/User");
const Device  = require("../models/Device");
const UserDevice = require("../models/UserDevice");

async function isGranted(user, device) {
    let userDevice = await UserDevice.findOne({
        user: user.id,
        device: device.id
    })
    .populate("user")
    .populate("device")
    .exec();

    console.log(userDevice ? true : false);
    return userDevice ? true : false;
}


module.exports.isGranted = isGranted;