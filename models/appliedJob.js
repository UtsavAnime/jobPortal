const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerSchema = new Schema({
    jobId: {
        type:String
    },
    userId: {
        type:String
    }

})


module.exports = mongoose.model('appliedJob', registerSchema);
