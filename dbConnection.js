const MongoClient = require('mongodb').MongoClient;
const db = "mongodb://localhost:27017/beandb"

var objConnection;


exports.dbConnect = function(callback)
{
    MongoClient.connect(db, (err, database) => {
        if (err) return console.log(err);
    
        objConnection = database.db("beandb");
        return callback(err, objConnection)
        
    });
}




