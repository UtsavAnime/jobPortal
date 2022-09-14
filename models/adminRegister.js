const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const registerSchema = new Schema({
	firstName: {
		type: String,
		require: true,
	},
	lastName: {
		type: String,
		require: true,
	},
	userName: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	role: {
		type: String,
		value: "admin",
	},
});

module.exports = mongoose.model("AdminRegister", registerSchema);
