const bcrypt = require('bcryptjs');
const Register = require("../models/register");

exports.getRegister = (req, res) => {
	if (
		req.body.firstName !== "" &&
		req.body.lastName !== "" &&
		req.body.occupation !== "" &&
		req.body.salary !== "" &&
		req.body.username !== "" &&
		req.body.password !== ""
	) 
	{

		firstName = req.body.firstName;
		lastName = req.body.lastName;
		occupation = req.body.occupation;
		salary = req.body.salary;
		userName = req.body.userName;
		password = req.body.password;

		//this will check if the user already exist or not
		Register.findOne({userName: userName}).then(userDoc =>{
			if(userDoc){
				res.send("UserName exists");
				return res.redirect('/register');
			}
			
			return bcrypt.hash(password, 12).then(hashPassword => {
				const RegisterModel = new Register({
					firstName: firstName,
					lastName: lastName,
					occupation: occupation,
					salary: salary,
					userName: userName,
					password: hashPassword,
				}); //object
				
				RegisterModel.save();
				return res.send(`You have been registered`);
			})
		})
			
			
				////


				// res.send(`You have been registered`);
				// res.send(console.log(`You have been registered`));
				// console.log("Heee");
				// res.redirect('/login');
			

	} else {
		res.send("Data cannot be blank.");
		console.log("Incorrect information!");
	}
};
