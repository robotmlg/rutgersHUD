
var express = require('express');
var app = express();
var buses = require('nextbusjs').client();

app.use(express.static(__dirname + '/public'));

// get the bus stops from https://rumobile.rutgers.edu/1/rutgersrouteconfig.txt

// routes
// get the predictions for a stop (only the plaza right now)
app.get('/api/times', function(req, res) {
  console.log("getting bus times");
  console.log(req.query);
  if (req.query.stop == null){
    console.log("NO STOP");
    res.send("NO STOP");
  }
  buses.stopPredict(req.query.stop, null, function(err, data) {
    if (err){
      console.log(err);
      res.send(err);
    }
    else{
      res.send(data);
      console.log(data);
    }
  }, 'minutes');
});

// get the active stops
app.get('/api/stops', function(req, res) {
  console.log("Getting active stops");
  buses.guessActive( function(err,data) {
    //console.log(data);
    active_stops = [];
    for (s in data.stops){
      //console.log(data.stops[s]);
      active_stops.push(data.stops[s].title);
    }
    console.log(active_stops);
    res.send(active_stops);
  });
});

// get the main page
app.get('*', function(req,res) {
  res.sendfile('./public/index.html');
});

console.log("building agency cache");

buses.cacheAgency('rutgers', function (err) {
  if (err) {
    console.log("error");
    throw err;
  } else {
    app.listen(8080);
    console.log("App listening on port 8080");
    buses.guessActive( function(err,data) {
      console.log(data);
    });
  }
});





