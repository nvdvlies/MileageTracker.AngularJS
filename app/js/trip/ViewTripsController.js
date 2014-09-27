(function() {
  'use strict';
   
  var ViewTripsController = function ($scope, $location, ngTableParams, TripService) {
    $scope.alerts = [];

    $scope.tableParams = new ngTableParams( // jshint ignore:line
      {
        page: 1, 
        count: 10 
      }, 
      {
        total: 0,
        getData: function($defer, params) {
          TripService.getTripsPaginated(params.page(), params.count())
            .then(function (response) {
              params.total(response.data.totalPages);
              $defer.resolve(response.data.items);
            }, function (response) {
              $scope.alerts.push(
                {
                  type: 'danger',
                  msg: response.data
                }
              );
            })
          ;
        }
      }
    );

    $scope.createNewTrip = function () {
      $location.path('/trips/create');
    };

    $scope.editTrip = function (trip) {
      $location.path('/trips/edit/' + trip.id);
    };

    $scope.deleteTrip = function (trip) {
      TripService.deleteTrip(trip)
        .then(function (response) {
          $scope.tableParams.reload();
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

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

  };
 
  angular
    .module("MileageTracker")
    .controller("ViewTripsController", ViewTripsController);

}());

