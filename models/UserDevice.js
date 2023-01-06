const mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');
const validator=require('validator');

const schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device"
    }

})
schema.plugin(uniqueValidator);

module.exports = mongoose.model("UserDevice", schema)