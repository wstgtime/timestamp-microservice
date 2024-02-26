// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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

// Test api
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function isValidDate(input) {
  const outputDate = new Date(input);
  return outputDate instanceof Date && !isNaN(outputDate);
}

function getUnixTime(input) {
  return Math.floor(input / 1000);
}

// get date in milliseconds
app.get("/api/:date?", function(req, res) {
  const outputDate = isValidDate(new Date(req.params.date)) ? new Date(req.params.date) 
    : isValidDate(new Date(parseInt(req.params.date))) ? new Date(parseInt(req.params.date)) 
    : null;

  if (!!outputDate) {
    res.json({ unix: getUnixTime(outputDate), utc: outputDate.toUTCString() });
  } else {
    res.json({ res: 'invalid date' });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
