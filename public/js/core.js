
var rutgersHUD = angular.module('rutgersHUD', []);

rutgersHUD.controller('bus_data', function($scope, $http, $interval){

  function update_times(){
    $http.get("/api/plaza")
      .then(function(response) {
        $scope.bus_times = response.data;
      });
  }

  update_times();

  $interval(function(){
    update_times();
  }, 30000);

});

