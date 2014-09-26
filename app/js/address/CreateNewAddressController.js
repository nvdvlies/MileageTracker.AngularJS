(function() {
	'use strict';
	 
	var CreateNewAddressController = function ($scope, $location, AddressService) {
		$scope.headerTitle = 'New address';
		$scope.alerts = [];

		$scope.address = {};

		$scope.saveAddress = function (address) {
			AddressService.saveNewAddress(address)
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
	};
 
	angular
		.module("MileageTracker")
		.controller("CreateNewAddressController", CreateNewAddressController);
}());