const jobPost = require("../models/jobPost");
const apply = require("../models/appliedJob");


exports.getJob = async (req, res) => {
	{
		if (req.session.userid != null) {
			const post = await jobPost.find();
            if(post){
			res.send(post);
            }else{
                res.status(400);
                res.send("No jobPost available....")
            }
		} else {
			res.status(400);
			res.send("Please login!");
		}
	}
};

exports.postPost = async (req, res) => {
	if (req.session.userid != null) {
		console.log(req.session.userid);

			occupationRequired = req.body.occupationRequired;
			const job = await jobPost.findOne({
				'occupationRequired': occupationRequired,
			});
          
			if (!job) {
                res.status(400);
                res.send(`No job is available for ${occupationRequired}`);
			}else{
                const RegisterModel = new apply({job}); //object

                await RegisterModel.save().then(console.log).catch(err => {
                    console.log(err);
                });
                res.send("Applied!")
               
            }
	} else {
		res.status(400);
		res.send("Please login!");
	}
};


exports.deletePost = async (req, res) => {
	{
		if (req.session.userid != null) {
			const post = await jobPost.findOne({
				postedBy: req.session.userid,
			});
            if(post){
            await jobPost
            .deleteOne({postedBy: req.session.userid, occupationRequired: req.body.occupationRequired}).then(console.log);
        
            res.send("Your profile has been deleted!");
            }
            else{
                res.status(400);
                res.send("No post available to delete!")
            }
		
		} else {
			res.status(400);
			res.send("Please login!");
		}
	}
};