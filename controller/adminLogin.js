const bcrypt = require("bcryptjs");
const Register = require("../models/adminRegister");
const jwt = require("jsonwebtoken");

exports.register = (req, res, next) => {
	if (
		req.body.firstName !== "" &&
		req.body.lastName !== "" &&
		req.body.username !== "" &&
		req.body.password !== ""
	) {
		firstName = req.body.firstName;
		lastName = req.body.lastName;
		userName = req.body.userName;
		password = req.body.password;

		Register.findOne({ userName: userName }).then((userDoc) => {
			if (userDoc) {
				res.send("UserName exists");
				return res.redirect("/register");
			}

			return bcrypt.hash(password, 12).then((hashPassword) => {
				const RegisterModel = new Register({
					firstName: firstName,
					lastName: lastName,
					userName: userName + "_Admin",
					password: hashPassword,
					role: "admin",
				}); //object
				console.log(RegisterModel);
				RegisterModel.save();
				return res.send(`You have been registered as an admin`);
			});
		});
	}
};

exports.postLogin = (req, res, next) => {
	const userName = req.body.userName;
	const password = req.body.password;

	Register.findOne({ userName: userName + "_Admin" }).then((user) => {
		if (!user) {
			return res.send("User doesnt exist, please register!");
		}
		Register.findOne({ role: "admin" }).then((result) => {
			if (!result) {
				return res.send("You are not an admin");
			}

			bcrypt
				.compare(password, user.password)
				.then((doMatch) => {
					if (doMatch) {
						req.session.userid = userName + "_Admin";
						req.session.isLoggedIn = true;
						console.log(req.session.isLoggedIn);
						jwt.sign({ user: userName }, "secretkey", (err, token) => {
							res.json({ token });
						});

						return;
					}
					res.send("Invalid Password");
				})
				.catch((err) => {
					console.log(err);
				});
		});
	});
};
