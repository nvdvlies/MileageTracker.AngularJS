(function() {
  'use strict';

  var EditTripController = function ($scope, $location, $routeParams, TripService, AddressService, CarService) {
    $scope.headerTitle = 'Edit trip';
    $scope.alerts = [];

    $scope.trip = {};
    $scope.addresses = [];
    $scope.cars = [];

    $scope.init = function () {
      AddressService.getAllAddresses()
        .then(function(data) { 
          $scope.addresses = data;
        }, function(reason) {
          $scope.alerts.push({
            type: 'danger',
            msg: reason
          });
        })
      ;
      CarService.getAllCars()
        .then(function(data) { 
          $scope.cars = data;
        }, function(reason) {
          $scope.alerts.push({
            type: 'danger',
            msg: reason
          });
        })
      ;
      TripService.getById($routeParams.tripId)
        .then(function (response) {
          $scope.trip = response.data;
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

    $scope.saveTrip = function (trip) {
      TripService.updateTrip(trip)
        .then(function (response) {
          $location.path('/trips');
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
      $location.path('/trips');
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.init();
  };
 
  angular
    .module("MileageTracker")
    .controller("EditTripController", EditTripController);
}());