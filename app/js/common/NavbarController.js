(function() {
	'use strict';
 
	var NavbarController = function ($scope, $location, AuthService) {
		$scope.isAuthenticated = function () {
			return AuthService.isAuthenticated();
		};

		$scope.isMenuActive = function (path) {
			return (path === $location.path());
		};

		$scope.logout = function () {
			AuthService.logout();
			$location.path('/login');
		};
	};
 
	angular
		.module("MileageTracker")
		.controller("NavbarController", NavbarController);
}());