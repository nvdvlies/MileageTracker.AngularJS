(function() {
	'use strict';

	require('angular');
	require('angular-route');
	require('angular-cookies');
	require('angular-bootstrap');
	require('ng-table');
	
	angular
		.module('MileageTracker', [
			'ngRoute',
			'ngCookies',
			'ui.bootstrap',
			'ngTable'
		])
		.constant("BACKEND_INFO", {
			"baseUrl": "http://127.0.0.1/api"
		})
		.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'views/trip/trips.html', 
					controller: 'ViewTripsController',
					authorize: true
				})
				.when('/register', {
					templateUrl: 'views/account/register.html', 
					controller: 'AccountController',
					authorize: false
				})
				.when('/login', {
					templateUrl: 'views/account/login.html', 
					controller: 'AccountController',
					authorize: false,
					hideNavBar: true
				})
				.when('/trips/create', {
					templateUrl: 'views/trip/add-edit-trip.html', 
					controller: 'CreateNewTripController',
					authorize: true
				})
				.when('/trips/edit/:tripId', {
					templateUrl: 'views/trip/add-edit-trip.html', 
					controller: 'EditTripController',
					authorize: true
				})
				.when('/addresses', {
					templateUrl: 'views/address/addresses.html', 
					controller: 'ViewAddressesController',
					authorize: true
				})
				.when('/addresses/create', {
					templateUrl: 'views/address/add-edit-address.html', 
					controller: 'CreateNewAddressController',
					authorize: true
				})
				.when('/addresses/edit/:addressId', {
					templateUrl: 'views/address/add-edit-address.html', 
					controller: 'EditAddressController',
					authorize: true
				})
				.when('/cars', {
					templateUrl: 'views/car/cars.html', 
					controller: 'ViewCarsController',
					authorize: true
				})
				.when('/cars/create', {
					templateUrl: 'views/car/add-edit-car.html', 
					controller: 'CreateNewCarController',
					authorize: true
				})
				.when('/cars/edit/:carId', {
					templateUrl: 'views/car/add-edit-car.html', 
					controller: 'EditCarController',
					authorize: true
				})
				.otherwise({
					redirectTo: '/'
				})
			;

			//Enable CORS
			$httpProvider.defaults.useXDomain = true;
			delete $httpProvider.defaults.headers.common['X-Requested-With'];


			//Globally intercept 'invalid token' HTTP response and redirect to login page
			$httpProvider.interceptors.push(function($q, $rootScope, $location) {
				return {
					'responseError': function(response) {
						if (response.status===401) {
							$rootScope.$broadcast('account_invalid_token');
							$location.path("/login");
						}
						return $q.reject(response);
					}
				};
			});

		}])
		.run(function($rootScope, $location, AuthService) {
			$rootScope.$on("$routeChangeStart", function(event, next, current) {
				if (next.authorize && !AuthService.isAuthenticated()) {
					$location.path("/login");
				}
			});
		})
	;

	require('./common/NavbarController');

	require('./account/AuthService');
	require('./account/AccountController');

	require('./car/CarService');
	require('./car/CreateNewCarController');
	require('./car/EditCarController');
	require('./car/ViewCarsController');

	require('./address/AddressService');
	require('./address/CreateNewAddressController');
	require('./address/EditAddressController');
	require('./address/ViewAddressesController');

	require('./trip/TripService');
	require('./trip/CreateNewTripController');
	require('./trip/EditTripController');
	require('./trip/ViewTripsController');

}());