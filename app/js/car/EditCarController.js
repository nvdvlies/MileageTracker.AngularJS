(function() {
	'use strict';

	var EditCarController = function ($scope, $location, $routeParams, CarService) {
		$scope.headerTitle = 'Edit car';
		$scope.alerts = [];

		$scope.car = {};

		$scope.init = function () {
			CarService.getById($routeParams.carId)
				.then(function (response) {
					$scope.car = response.data;
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

		$scope.saveCar = function (car) {
			CarService.updateCar(car)
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

		$scope.init();
	};
 
	angular
		.module("MileageTracker")
		.controller("EditCarController", EditCarController);
}());