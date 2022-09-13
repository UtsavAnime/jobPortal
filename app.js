const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const session = require('express-session');
const adminsession = require('express-session');
const mongodb_storage = require('connect-mongodb-session')(session);
const jwt = require('jsonwebtoken');

const mongodb_URI = "mongodb+srv://jobPortal:vUP9jVeqdGGtKUB8@jobportal.81ybnxw.mongodb.net/jobPortal?retryWrites=true&w=majority"


const app = express();
const storage = new mongodb_storage({
	uri: mongodb_URI,
	collection: 'session'
})

//Routes
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const adminRoutes = require("./routes/adminLogin");
const profileRoutes = require("./routes/jobProfile");
const postRoutes = require("./routes/jobPost");
const jobAvailableRoutes = require("./routes/jobAvailable");

app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({secret: 'Its a secret', resave: false, cookie: { maxAge: 60000 }, saveUninitialized: false, store: storage}))
app.use(adminsession({secret: 'Its a secret', resave: false, cookie: { maxAge: 60000 }, saveUninitialized: false, store: storage}))

app.use(registerRoutes);
app.use(loginRoutes);
app.use(adminRoutes);

app.use(verifyToken);

app.use(profileRoutes);
app.use(postRoutes);
app.use(jobAvailableRoutes);

function verifyToken(req, res, next){
	
	const bearerHeader = req.headers['authorization'];

	if(bearerHeader != 'undefined'){
		console.log("Its in request, " + 	req.session.token);
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		console.log("bearerToken, " + bearerToken);
		if(bearerToken == req.session.token){
			
			next()
			// req.token = bearerToken
			// console.log(bearerHeader);
		}
		else{
			res.sendStatus(403);
		}
		
	}else {
		res.sendStatus(403);
		
	}
}


mongoose
	.connect(
		"mongodb+srv://jobPortal:vUP9jVeqdGGtKUB8@jobportal.81ybnxw.mongodb.net/jobPortal?retryWrites=true&w=majority"
	)
	.then((client) => {
		app.listen(3000);
		console.log("Connected");
	})
	.catch((err) => {
		console.log("Error : " + err);
		throw err;
	});
