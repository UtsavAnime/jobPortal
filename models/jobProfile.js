const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerSchema = new Schema({
    userName: {
        type: String,
        require: true
    },
    occupation: {
        type: String,
        require: true
    },

    jobDescription: {
        type: String,
        require: true
    }
})


module.exports = mongoose.model('JobProfile', registerSchema);
