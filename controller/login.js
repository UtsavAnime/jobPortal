const Login = require('../models/login');


exports.getLogin = (req, res) => {
    if(req.body.userName !== "" && req.body.password !== ""){
        userName = req.body.userName,
        password = req.body.password

        const LoginModel = new Login(userName, password);
        console.log(LoginModel);
        LoginModel.save().then(result => {
            console.log("Its done");
        });
        res.redirect('/profile')
    }else{

        res.send("Incorrect password")
    }
}