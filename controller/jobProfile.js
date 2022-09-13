const jobProfile = require("../models/jobProfile");
const login = require("./login");

exports.postProfile = async (req, res) => {
	if (req.session.userid != null) {
		console.log(req.session.userid);

		if (
			// req.body.userName !== "" &&
			req.body.occupation !== "" &&
			req.body.jobDescription !== ""
		) {
			userName = req.session.userid;
			occupation = req.body.occupation;
			jobDescription = req.body.jobDescription;
			const profile = await jobProfile.findOne({
				userName: req.session.userid,
			});

			if (!profile) {
				const ProfileModel = new jobProfile({
					userName: req.session.userid,
					occupation: occupation,
					jobDescription: jobDescription,
				}); //object

				console.log(ProfileModel);
				ProfileModel.save();
				return res.send(`Your profile has been saved`);
			} else {
				
				const ProfileModel = new jobProfile({
					occupation: occupation,
					jobDescription: jobDescription,
				});

				await jobProfile
					.findOneAndUpdate(
						{ userName: req.session.userid },
						{ occupation: occupation, jobDescription: jobDescription }
					)
					.then(console.log);
				
				res.send("Your profile has been updated!");
			}
		} else {
			res.send("Data cannot be blank.");
			console.log("Incorrect information!");
		}
	} else {
		res.status(400);
		res.send("Please login!");
	}
};

exports.getProfile = async (req, res) => {
	{
		if (req.session.userid != null) {
			const profile = await jobProfile.findOne({
				userName: req.session.userid,
			});
			console.log(req.session.userid);
			console.log(profile);
			res.send(profile);
		} else {
			res.status(400);
			res.send("Please login!");
		}
	}
};