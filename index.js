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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function isValidDate(d) {
  if (!isNaN(d)) {
    const miliseconds =  d * 1000;
    const dateObject = new Date(miliseconds)
    if (dateObject instanceof Date) {
      return dateObject;
    }else {
      return false;
    }
  } else {
    const dateObject = new Date(d);
    if (dateObject instanceof Date) {
      return dateObject;
    } else {
      return false;
    }
  }
}


app.get("/api", (req,res)=>{
  const validDate = new Date();
    const unixStamp = Math.floor(validDate.getTime());
    return res.json({
      "unix": unixStamp,
      "utc": validDate.toUTCString()
    })
})

app.get("/api/:date", (req,res)=>{
  const {date} = req.params;
  const validDate = isValidDate(date);
  if (validDate) {
    const unixStamp = Math.floor(validDate.getTime() / 1000);
    const dateString = new Date(unixStamp);
    if (unixStamp) {
      return res.json({
        "unix": unixStamp,
        "utc": dateString.toUTCString()
      })
    } else {
      return res.json({
        "error": "Invalid Date"
      });
    }
  } else {
    return res.json({
      "error": "Invalid Date"
    });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
