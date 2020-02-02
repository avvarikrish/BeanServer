var dbConnect = require("./dbConnection.js")
require('dotenv').load();
const ACCOUNT_SID = process.env.ACCOUNT_SID; //Get yours here: https://www.twilio.com/console
const API_KEY_SID = process.env.API_KEY_SID; //Get yours here: https://www.twilio.com/console/video/dev-tools/api-keys
const API_KEY_SECRET = process.env.API_KEY_SECRET; //Get yours here: https://www.twilio.com/console/video/dev-tools/api-keys
const Twilio = require('twilio');

const client = new Twilio(API_KEY_SID, API_KEY_SECRET, {
  accountSid: ACCOUNT_SID
});



exports.CreateAccount = function(req, callback)
{
    console.log(req.originalUrl)
    var reg = 
    {
        username: req.body.username,
        password: req.body.password
    }
    dbConnect.dbConnect(function(err, connection)
    {
        connection.collection('accounts').insertOne(reg, (err, result) => {
            if(err){
                callback(err, "")
            }else{
                callback(err, "Registered")
            }
        })
    })
}

exports.Login = function(req, callback)
{
    var userQuery = {

        username: req.query.username,
        password: req.query.password
    }
    dbConnect.dbConnect(function(err, connection)
    {
        connection.collection('accounts').findOne(userQuery, (err, item) => {
            if (err) {
                callback(err, "")
            } else {
                callback(err, item)
            }
    })
})
}

exports.AddRoom = function(req, res)
{
    client.video.rooms
    .create({
        type: 'group-small',
        uniqueName: req.body.roomName,
        recordParticipantsOnConnect: true
    })
    .then(room => {
        roomSid = room.sid;
        res.send("room created")
        console.log('Room ' + room.uniqueName + ' created successfully');
        console.log('RoomSid=' + room.sid);
        console.log('Room ' + roomName + ' ready to receive client connections');
    })
    .catch(error => {
        res.send("room failed")
        console.log('Error creating room ' + error);
        process.exit(-1);
    });
}


exports.CheckExistance = function(req, res)
{
    client.video.rooms(req.query.roomName)
    .fetch()
    .then(room => res.send(room))
}

exports.getAllUsers = function(req,  res)
{
    dbConnect.dbConnect(function(err, connection)
    {
        connection.collection("accounts").find({}).toArray((err, items) =>
        {
            if(err){
                res.send(err)
            }
            else
            {
                res.send(items)
            }
        })
    })
}

exports.getAllInCompleteRooms = function(req, res)
{
    client.video.rooms
        .list({status:"in-progress"})
        .then(rooms =>  res.send(rooms))
        .catch(error => res.send(error))
}
