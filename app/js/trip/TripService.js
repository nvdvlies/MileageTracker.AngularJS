(function() {
	'use strict'; 

	var TripService = function ($http, BACKEND_INFO) {
		var trips = [];

		var getTripsPaginated = function (page, pageSize) {
			return $http({
				method: 'GET', 
				url: BACKEND_INFO.baseUrl + '/trips', 
				headers: {
					'Accept': 'application/json'
				},
				params: {
					pagenumber: page,
					pagesize: pageSize
				}
			});
		};

		var getById = function (tripId) {
			return $http({
				method: 'GET', 
				url: BACKEND_INFO.baseUrl + '/trips/' + tripId, 
				headers: {
					'Accept': 'application/json'
				}
			});
		};

		var getNewTripTemplate = function () {
			return $http({
				method: 'GET', 
				url: BACKEND_INFO.baseUrl + '/trips/template', 
				headers: {
					'Accept': 'application/json'
				}
			});
		};

		var saveNewTrip = function (trip) {
			return $http({
				method: 'POST', 
				url: BACKEND_INFO.baseUrl + '/trips', 
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				data: trip
			});
		};

		var updateTrip = function (trip) {
			return $http({
				method: 'PUT', 
				url: BACKEND_INFO.baseUrl + '/trips/' + trip.id, 
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				data: trip
			});
		};

		var deleteTrip = function (trip) {
			return $http({
				method: 'DELETE', 
				url: BACKEND_INFO.baseUrl + '/trips/' + trip.id
			});
		};

		return {
			getTripsPaginated: getTripsPaginated,
			getById: getById,
			getNewTripTemplate: getNewTripTemplate,
			saveNewTrip: saveNewTrip,
			updateTrip: updateTrip,
			deleteTrip: deleteTrip
		};
	};
 
	angular
		.module("MileageTracker")
		.factory("TripService", TripService);
}());
