(function() {
	'use strict';
	 
	var ViewCarsController = function ($scope, $location, ngTableParams, CarService) {
		$scope.alerts = [];

		$scope.tableParams = new ngTableParams( // jshint ignore:line
			{
				page: 1, 
				count: 10 
			}, 
			{
				total: 0,
				getData: function($defer, params) {
					CarService.getCarsPaginated(params.page(), params.count())
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

		$scope.createNewCar = function () {
			$location.path('/cars/create');
		};

		$scope.editCar = function (car) {
			$location.path('/cars/edit/' + car.id);
		};

		$scope.deleteCar = function (car) {
			CarService.deleteCar(car)
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
		.controller("ViewCarsController", ViewCarsController);

}());

