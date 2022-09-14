const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const registerSchema = new Schema({
	postedBy: {
		type: String,
	},

	occupationRequired: {
		type: String,
		require: true,
	},

	jobDescription: {
		type: String,
		require: true,
	},
});

module.exports = mongoose.model("JobPost", registerSchema);
