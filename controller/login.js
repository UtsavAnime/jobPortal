const bcrypt = require("bcryptjs");
const Register = require("../models/register");
const jwt = require("jsonwebtoken");

exports.postLogin = (req, res, next) => {
	const userName = req.body.userName;
	const password = req.body.password;

	Register.findOne({ userName: userName }).then((user) => {
		if (!user) {
			return res.send("User doesnt exist, please register!");
		}

		bcrypt
			.compare(password, user.password)
			.then((doMatch) => {
				if (doMatch) {
					req.session.userid = userName;
					req.session.isLoggedIn = true;
					jwt.sign({ user: userName }, "secretkey", (err, token) => {
						token = token;
						req.session.token = token;
						res.json({ token });
					});
					console.log("Hello " + req.session.isLoggedIn);
					return;
				}
				res.send("Invalid Password");
			})
			.catch((err) => {
				console.log(err);
			});
	});
};

exports.getLogout = (req, res, next) => {
	req.session.destroy(() => {
		res.send("You have been logged out!");
	});
};
