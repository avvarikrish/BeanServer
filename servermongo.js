const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
var accountRoute = require("./routes/apiHolder.js")
const app = express();
const http = require('http');
const Twilio = require('twilio');





app.use(bodyParser.urlencoded({extended: true}));
app.use(accountRoute)
app.use(cors({origin: '*'}));


server = http.createServer(app);

const port = 8000;


app.listen(port, () => {
    console.log('We are on port ' + port);


var io = require('socket.io')(server);

var AccessToken = Twilio.jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

io.on('connection', function(socket) {

  //Client ask for an AccessToken. Generate a random identity and provide it.
  socket.on('getAccessToken', function(msg) {

    console.log("getAccessToken request received");

    var userName;
    if (msg && msg.userName) {
      userName = msg.userName;
    }

    var accessToken = new AccessToken(
      ACCOUNT_SID,
      API_KEY_SID,
      API_KEY_SECRET
    );

    accessToken.identity = userName;

    var grant = new VideoGrant();
    grant.room = msg.roomName;
    accessToken.addGrant(grant);

    var answer = {
      jwtToken: accessToken.toJwt(),
      roomName: msg.roomName
    }

    console.log("JWT accessToken generated: " + accessToken.toJwt() + "\n");

    socket.emit("accessToken", answer);
  });
});


// MongoClient.connect(db, (err, database) => {
// 	if (err) return console.log(err);

// 	db = database.db("beandb");
// 	require('./App/Routes')(app, db);

	
// 	});
})