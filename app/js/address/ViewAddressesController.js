(function() {
	'use strict';
	 
	var ViewAddressesController = function ($scope, $location, ngTableParams, AddressService) {
		$scope.alerts = [];

		$scope.tableParams = new ngTableParams( // jshint ignore:line
			{
				page: 1, 
				count: 10 
			}, 
			{
				total: 0,
				getData: function($defer, params) {
					AddressService.getAddressesPaginated(params.page(), params.count())
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

		$scope.createNewAddress = function () {
			$location.path('/addresses/create');
		};

		$scope.editAddress = function (address) {
			$location.path('/addresses/edit/' + address.id);
		};

		$scope.deleteAddress = function (address) {
			AddressService.deleteAddress(address)
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
		.controller("ViewAddressesController", ViewAddressesController);

}());

