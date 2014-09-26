(function () {
	'use strict';

	describe('Unit: NavbarController', function() {
		var scope;
		
		beforeEach(function(){
			module('ngRoute');
			module('ngCookies');
			module('ui.bootstrap');
			module('ngTable');
			module('MileageTracker');
		});

		//should know whether the user is authenticated

		//should have an activated menu item if user is on corresponding location

		//should be able to logout

		// it('xx', function() {
		// 		var controller = createController();
		// 		$location.path('/trips');
		// 		expect($location.path()).toBe('/trips');
		// 		expect(scope.isMenuActive('/trips')).toBe(true);
		// 		expect(scope.isMenuActive('/cars')).toBe(false);
		// });
		

		// it('xx', function() {
		// 	var controller = createController();

		// 	expect(scope.isAuthenticated()).toBe(false);
		// });


	});

}());