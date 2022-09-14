const jobPost = require("../models/jobPost");

exports.postPost = async (req, res) => {
	if (req.session.userid != null) {
		console.log(req.session.userid);

		if (req.body.occupationRequired !== "" && req.body.jobDescription !== "") {
			occupationRequired = req.body.occupationRequired;
			jobDescription = req.body.jobDescription;
			const job = await jobPost.findOne({
				occupationRequired: occupationRequired,
			});

			if (!job) {
				const jobModel = new jobPost({
					postedBy: req.session.userid,
					occupationRequired: req.body.occupationRequired,
					jobDescription: req.body.jobDescription,
				});

				jobModel.save();
				return res.send(`Your Job requirement has been posted`);
			} else {
				res.status(400);
				res.send(
					`You have already posted job for ${occupationRequired}, Please post a different job or delete this one. `
				);
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

exports.getPost = async (req, res) => {
	{
		if (req.session.userid != null) {
			const post = await jobPost.find({
				postedBy: req.session.userid,
			});
			if (post) {
				res.send(post);
			} else {
				res.status(400);
				res.send("No jobPost available....");
			}
		} else {
			res.status(400);
			res.send("Please login!");
		}
	}
};
exports.deletePost = async (req, res) => {
	{
		if (req.session.userid != null) {
			const post = await jobPost.findOne({
				postedBy: req.session.userid,
			});
			if (post) {
				await jobPost
					.deleteOne({
						postedBy: req.session.userid,
						occupationRequired: req.body.occupationRequired,
					})
					.then(console.log);

				res.send("Your profile has been deleted!");
			} else {
				res.status(400);
				res.send("No post available to delete!");
			}
		} else {
			res.status(400);
			res.send("Please login!");
		}
	}
};
