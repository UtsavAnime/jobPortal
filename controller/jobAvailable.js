const jobPost = require("../models/jobPost");
const apply = require("../models/appliedJob");
const Register = require("../models/register");

exports.getJob = async (req, res) => {
	{
		if (req.session.userid != null) {
			const post = await jobPost.find();
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

exports.postPost = async (req, res) => {
	if (req.session.userid == null) {
		res.status(400);
		res.send("Please login!");
	}
	occupationRequired = req.body.occupationRequired;
	const job = await jobPost.findOne({
		occupationRequired: occupationRequired,
	});
	if (job == null) {
		res.status(400);
		return res.send(`No job has been posted for this ${occupationRequired}`);
	}
	const user = await Register.findOne({
		userName: req.session.userid,
	});
	const jobId = await apply.findOne({
		jobId: job._id,
		userId: user._id,
	});
	if (jobId == null) {
		if (jobId) {
			res.status(400);
			res.send("You have already applied for this job!");
		}
		const RegisterModel = new apply({
			userId: user._id,
			jobId: job._id,
		});
		RegisterModel.save();
		res.send("Applied!");
	} else {
		res.status(400);
		return res.send(`You have already applied for this ${occupationRequired}`);
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
