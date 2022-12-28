const mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');
const validator=require('validator');

const schema = mongoose.Schema({
	name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
	isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
})
schema.plugin(uniqueValidator);

module.exports = mongoose.model("User", schema)