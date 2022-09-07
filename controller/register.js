const Register = require('../models/register');

exports.getRegister = (req, res) => {

    if (req.body.firstName !== ""  && req.body.lastName !== "" && req.body.occupation !== "" && req.body.salary !== "" && req.body.username !== "" && req.body.password !== ""){

        firstName = req.body.firstName;
        lastName = req.body.lastName;
        occupation = req.body.occupation;
        salary = req.body.salary;
        userName = req.body.userName;
        password = req.body.password;
        
        const RegisterModel = new Register(firstName, lastName, occupation, salary, userName, password); //object
        console.log(RegisterModel);
        RegisterModel.save().then(result => { 
            console.log("Registered");
        })
        res.send(`You have been registered`);
        res.send(console.log(`You have been registered`));
        console.log("Heee");
        //res.redirect('/login');
    }
    else{
        res.send('Data cannot be blank.')
        console.log("Incorrect information!");
    }
}