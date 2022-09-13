const bcrypt = require('bcryptjs')
const Register = require("../models/register");
const jwt = require('jsonwebtoken');

exports.postLogin = (req,res, next) => {
//  const isLoggedIn = req.get('Cookie').split('=')[1] === true;
//   isAuthenticated = isLoggedIn;
//  console.log(isLoggedIn);
 const userName = req.body.userName;
 const password = req.body.password;

 Register.findOne({userName: userName}).then(user => {
    if(!user){
        return res.send("User doesnt exist, please register!")
    }

    bcrypt.compare(password, user.password).then(doMatch => {
        if(doMatch) {
            req.session.userid = userName;
            req.session.isLoggedIn = true;
            jwt.sign({user:userName}, 'secretkey', (err, token) => {
                token = token
                console.log("Hii" + token);
                req.session.token = token;
                console.log("Its in request, " + req.session.token);
                res.json({token});
            });
            console.log("Hello " + req.session.isLoggedIn);
            return
            //return res.send("You have been logged in!");
            //return res.redirect('/profile');
            // return res.send("Welcome");
        }
        res.send('Invalid Password');
    }).catch(err => {
        console.log(err);
        
    })  

 })
}

// exports.getLogin = (req, res, next) => {
//     // res.setHeader('Set-Cookie', 'loggedIn = true');
//     console.log(req.session.userid);
//     req.session.isLoggedIn = true;
//     console.log(req.session.isLoggedIn);

//     // res.redirect('/');
//     res.end()

// }

exports.getLogout = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn = true');
    req.session.destroy(() => {
        res.send("You have been logged out!")
    })
  

}