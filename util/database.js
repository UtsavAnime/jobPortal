const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {

    MongoClient.connect("mongodb+srv://jobPortal:vUP9jVeqdGGtKUB8@jobportal.81ybnxw.mongodb.net/jobPortal?retryWrites=true&w=majority")
.then(client => {
     console.log("Connected");
     _db = client.db()
     callback();
})
.catch(err => {
    console.log("Error : " +  err);
    throw err;
});

}

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No Database found!'
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;