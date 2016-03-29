
var express = require('express');
var app = express();
var buses = require('nextbusjs').client();

app.use(express.static(__dirname + '/public'));

// get the bus stops from https://rumobile.rutgers.edu/1/rutgersrouteconfig.txt

// routes
app.get('/api/plaza', function(req, res) {
  console.log("getting bus times");
  buses.stopPredict('Livingston Plaza', null, function(err, data) {
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
  }
});





