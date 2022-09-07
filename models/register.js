const getDb = require('../util/database').getDb;

class Register{
    constructor(firstName, lastName, occupation, salary, userName, password){
        this.firstName = firstName;                 //this function will save the data inside the class
        this.lastName = lastName;
        this.occupation = occupation;
        this.salary = salary;
        this.userName = userName;
        this.password = password;
    }

    save(){
        const db = getDb();
        return db.collection('registeration').insertOne(this).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    };

};

module.exports = Register;