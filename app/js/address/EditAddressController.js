(function() {
  'use strict';

  var EditAddressController = function ($scope, $location, $routeParams, AddressService) {
    $scope.headerTitle = 'Edit address';
    $scope.alerts = [];

    $scope.address = {};

    $scope.init = function () {
      AddressService.getById($routeParams.addressId)
        .then(function (response) {
          $scope.address = response.data;
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

    $scope.saveAddress = function (address) {
      AddressService.updateAddress(address)
        .then(function (response) {
          $location.path('/addresses');
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
      $location.path('/addresses');
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.init();
  };

  angular
    .module("MileageTracker")
    .controller("EditAddressController", EditAddressController);
}());