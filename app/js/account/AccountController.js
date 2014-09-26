(function() {
	'use strict';
	 
	var AccountController = function ($scope, $location, AuthService) {
		$scope.user = {};
		$scope.alerts = [];

		$scope.register = function (user) {
			$scope.alerts = [];
			AuthService.register(user.username, user.password, user.confirmPassword)
				.then(function (response) {
					$scope.login(user);
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

		$scope.login = function (user) {
			$scope.alerts = [];
			AuthService.login(user.username, user.password)
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

		$scope.logout = function () {
			AuthService.logout();
		};

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};

	};
 
	angular
		.module("MileageTracker")
		.controller("AccountController", AccountController);
}());
