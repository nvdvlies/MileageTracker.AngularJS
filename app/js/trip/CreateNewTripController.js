(function() {
	'use strict';
	 
	var CreateNewTripController = function ($scope, $location, TripService, AddressService, CarService) {
		$scope.headerTitle = 'New trip';
		$scope.alerts = [];

		$scope.trip = {};
		$scope.addresses = [];
		$scope.cars = [];

		$scope.init = function () {
			$scope.getAllAddresses();
			$scope.getAllCars();

			//retrieve a prefilled trip (with current date, latest used car and most recent destination 
			//as the origin address)
			$scope.loadNewTripTemplate();
		};

		$scope.getAllAddresses = function () {
			AddressService.getAllAddresses()
				.then(
					function(data) { 
						$scope.addresses = data;
					},
					function(reason) {
						$scope.alerts.push({
							type: 'danger',
							msg: reason
						});
					}
				)
			;
		};

		$scope.getAllCars = function () {
			CarService.getAllCars()
				.then(
					function(data) { 
						$scope.cars = data;
					},
					function(reason) {
						$scope.alerts.push({
							type: 'danger',
							msg: reason
						});
					}
				)
			;
		};

		$scope.loadNewTripTemplate = function () {
			TripService.getNewTripTemplate()
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
			$scope.alerts = [];
			TripService.saveNewTrip(trip)
				.then(function (response) {
					$location.path('/');
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
			$location.path('/');
		};

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};

		$scope.init();
	};
 
	angular
		.module("MileageTracker")
		.controller("CreateNewTripController", CreateNewTripController);
}());