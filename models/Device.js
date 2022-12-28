const mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const Notification = require("../models/Notification");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    baseUrl: {
        type: String,
        required: true
    },
    header: {
        type: Object,
        required: false
    },
    body: {
        type: Object,
        required: false
    },
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification"
    }]
})
schema.plugin(uniqueValidator);

module.exports = mongoose.model("Device", schema)