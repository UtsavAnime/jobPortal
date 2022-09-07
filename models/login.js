const getDB = require('../util/database').getDb;

class Login{

    constructor(userName, password){
        this.userName = userName;
        this.password = password;
    }

 save(){
    const db = getDB();
    db.collection('registeration').findOne({userName:userName}).then(result => {
            //console.log(result);
        }).catch(err => {
            console.log(err);
        });
        console.log(userName);
    };
};
module.exports = Login;