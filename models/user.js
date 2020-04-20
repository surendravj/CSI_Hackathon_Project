const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userModel = schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isTutor: {
        type: Boolean,
        default: false
    }
});


const model = mongoose.model('users', userModel);

module.exports = model;