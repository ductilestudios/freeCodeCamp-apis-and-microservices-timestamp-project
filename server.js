// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
app.disable('etag');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//Send now's date information 
app.get("/api", function (req, res) {
  var date = new Date();
  res.json({"unix": date.getTime(), "utc": date.toUTCString()});
});

//Parse submitted date as requested
app.get("/api/:date", function (req, res) {
  var date = new Date(req.params.date);
  if (date == "Invalid Date") {
    date = new Date(parseInt(req.params.date)) //Convert possible unix timestamp
    if (date == "Invalid Date") { 
    res.json({ error : "Invalid Date" })
    } else {
      res.json({"unix": date.getTime(), "utc": date.toUTCString()})
    }
  } else {
    res.json({"unix": date.getTime(), "utc": date.toUTCString()})
  }
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
