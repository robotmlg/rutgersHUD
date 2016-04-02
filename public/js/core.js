
var rutgersHUD = angular.module('rutgersHUD', []);

rutgersHUD.controller('bus_data', function($scope, $http, $interval){

  function update_times(){
    $http.get("/api/plaza")
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
      });
  }

  update_times();

  $interval(function(){
    update_times();
  }, 30000);

});

