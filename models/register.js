const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    occupation: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})


module.exports = mongoose.model('Register', registerSchema);
