const mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');
const validator=require('validator');

const schema = mongoose.Schema({
	name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum : ['Alertzy']
    },
    token: {
        type: String,
        required: true
    },
})
schema.plugin(uniqueValidator);

module.exports = mongoose.model("Notification", schema)