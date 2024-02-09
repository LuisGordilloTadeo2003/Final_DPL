// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
  let dateInput = req.params.date;

  // If date parameter is empty, use current time
  if (!dateInput) {
    dateInput = new Date();
  } else if (!isNaN(dateInput)) {
    // If input is a Unix timestamp, convert it to milliseconds
    dateInput = parseInt(dateInput);
  }

  let dateObject = new Date(dateInput);

  // Check if dateObject is valid
  if (dateObject.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: dateObject.getTime(),
    utc: dateObject.toUTCString()
  });
});

app.enable('trust proxy'); // to get correct client IP behind proxy

app.get('/api/whoami', (req, res) => {
  const ipAddress = req.ip.replace(/^.*:/, ''); // Extract IPv4 address
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  res.json({
    ipaddress: ipAddress,
    language: language,
    software: software
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
