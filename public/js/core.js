
var rutgersHUD = angular.module('rutgersHUD', ['ngCookies']);

var global_stop = 'Livingston Plaza';

rutgersHUD.controller('data-display', function($scope, $http, $interval, $cookies){

  function update_times(stop){
    $http.get("/api/times?stop=" + stop)
      .then(function(response) {
        // get the data
        my_data = response.data;
        // format the data
        for (j = 0; j < my_data.length; ++j){
          bus = my_data[j];
          if (bus.predictions == null){
            continue;
          }
          else if (bus.predictions.length > 3){
            bus.predictions = bus.predictions.slice(0,3);
          }
          for (i = 0; i < bus.predictions.length; ++i){
            if (i == bus.predictions.length-1){
              bus.predictions[i] = "and " + bus.predictions[i] + " minutes";
            }
            else {
              bus.predictions[i] = bus.predictions[i] + ", ";
            }
          }
        }
        // send data to page
        $scope.bus_times = my_data;
        $scope.global_stop = global_stop;
      });
  }

  function get_stops(){
    $http.get('/api/stops')
      .then( function(response) {
        $scope.stops_list = response.data;
        stops_list = response.data;
      });
  }

  $scope.set_stop = function(stop_str){
    console.log("setting stop to "+stop_str);
    global_stop = stop_str;
    $cookies.put("rutgersHUDstop",stop_str);//set the cookie
    update_times(global_stop);
  }

  // retrieve the stop from the cookie if it exists
  temp = $cookies.get("rutgersHUDstop");
  if (temp){
    global_stop = temp;
    console.log("Got cookie "+global_stop+". Yum!");
  }
  

  update_times(global_stop);
  get_stops();

  $interval(function(){
    update_times(global_stop);
    get_stops();
  }, 30000);

});

