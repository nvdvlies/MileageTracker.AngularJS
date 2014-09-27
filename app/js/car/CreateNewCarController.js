(function() {
  'use strict';
   
  var CreateNewCarController = function ($scope, $location, CarService) {
    $scope.headerTitle = 'New car';
    $scope.alerts = [];

    $scope.car = {};

    $scope.saveCar = function (car) {
      CarService.saveNewCar(car)
        .then(function (response) {
          $location.path('/cars');
        }, function (response) {
          $scope.alerts.push(
            {
              type: 'danger',
              msg: response.data
            }
          );
        })
      ;
    };

    $scope.cancel = function () {
      $location.path('/cars');
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  };
 
  angular
    .module("MileageTracker")
    .controller("CreateNewCarController", CreateNewCarController);
}());