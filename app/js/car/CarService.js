(function() {
	'use strict'; 

	var CarService = function ($http, $q, BACKEND_INFO) {

		var getCarsPaginated = function (page, pageSize) {
			return $http({
				method: 'GET', 
				url: BACKEND_INFO.baseUrl + '/cars', 
				headers: {
					'Accept': 'application/json'
				},
				params: {
					pagenumber: page,
					pagesize: pageSize
				}
			});
		};

		var getAllCars = function () {
			var cars = [];
			var deferred = $q.defer();
			
			function _getAllCars(currentPage) {
				getCarsPaginated(currentPage, 15)
					.success(function (data) {
						cars = cars.concat(data.items);
						if(data.totalPages > currentPage) {
							_getAllCars(currentPage+=1);
						} else {
							deferred.resolve(cars);
						}
					})
					.error(function (data, status) {
						deferred.reject(data);
					})
				;
			}
			_getAllCars(1);

			return deferred.promise;
		};

		var getById = function (carId) {
			return $http({
				method: 'GET', 
				url: BACKEND_INFO.baseUrl + '/cars/' + carId, 
				headers: {
					'Accept': 'application/json'
				}
			});
		};

		var getNewCarTemplate = function () {
			return $http({
				method: 'GET', 
				url: BACKEND_INFO.baseUrl + '/cars/template', 
				headers: {
					'Accept': 'application/json'
				}
			});
		};

		var saveNewCar = function (car) {
			return $http({
				method: 'POST', 
				url: BACKEND_INFO.baseUrl + '/cars', 
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				data: car
			});
		};

		var updateCar = function (car) {
			return $http({
				method: 'PUT', 
				url: BACKEND_INFO.baseUrl + '/cars/' + car.id, 
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				data: car
			});
		};

		var deleteCar = function (car) {
			return $http({
				method: 'DELETE', 
				url: BACKEND_INFO.baseUrl + '/cars/' + car.id
			});
		};

		return {
			getCarsPaginated: getCarsPaginated,
			getAllCars: getAllCars,
			getById: getById,
			getNewCarTemplate: getNewCarTemplate,
			saveNewCar: saveNewCar,
			updateCar: updateCar,
			deleteCar: deleteCar
		};
	};
 
	angular
		.module("MileageTracker")
		.factory("CarService", CarService);
}());
