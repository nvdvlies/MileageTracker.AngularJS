(function () {
	'use strict';

	describe('Unit: AuthService', function() {
		var $httpBackend, $rootScope, AuthService, BACKEND_INFO;

		beforeEach(function(){
			module('ngRoute');
			module('ngCookies');
			module('ui.bootstrap');
			module('ngTable');
			module('MileageTracker');
		});

		beforeEach(inject(function(_$rootScope_, _$httpBackend_, _AuthService_, _BACKEND_INFO_) {
			$httpBackend = _$httpBackend_;
			$rootScope = _$rootScope_;
			BACKEND_INFO = _BACKEND_INFO_;
			AuthService = _AuthService_;
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should be able to login', function() {
			//Arrange
			$httpBackend.expect('POST', BACKEND_INFO.baseUrl + '/account/token')
				.respond(200, {access_token: 'TestToken'});

			//Act + Assert
			expect(AuthService.isAuthenticated()).toBe(false);

			AuthService.login('TestUser','TestPassword')
				.then(function(response) {
					expect(AuthService.getUser().username).toEqual('TestUser');
					expect(AuthService.getUser().token).toEqual('TestToken');
					expect(AuthService.isAuthenticated()).toBe(true);
				}, function (response) {
					throw 'Received error callback';
				});
			$httpBackend.flush();
		});

		it('should return error on invalid login', function() {
			//Arrange
			$httpBackend.expect('POST', BACKEND_INFO.baseUrl + '/account/token')
				.respond(401, 'Unauthorized');

			//Act + Assert
			AuthService.login('InvalidUser','InvalidPassword')
				.then(function(response) {
					throw 'Received success callback';
				}, function (response) {
					expect(AuthService.isAuthenticated()).toBe(false);
				});
			$httpBackend.flush();
		});

		it('should be able to register', function() {
			//Arrange
			$httpBackend.expect('POST', BACKEND_INFO.baseUrl + '/account/register')
				.respond(200);

			var successCallback = jasmine.createSpy('successCallback');
			var errorCallback = jasmine.createSpy('errorCallback');

			//Act + Assert
			AuthService.register('TestUser','TestPassword', 'TestPassword')
				.then(successCallback, errorCallback);

			$httpBackend.flush();

			expect(successCallback).toHaveBeenCalled();
			expect(errorCallback).not.toHaveBeenCalled();

		});

		it('should return error on invalid registration', function() {
			//Arrange
			$httpBackend.expect('POST', BACKEND_INFO.baseUrl + '/account/register')
				.respond(400, 'Name is already taken');

			//Act + Assert
			AuthService.register('InvalidUser','InvalidPassword', 'InvalidPassword')
				.then(function(response) {
					throw 'Received success callback';
				}, function (response) {
					expect(AuthService.isAuthenticated()).toBe(false);
				});
			$httpBackend.flush();
		});

		it('should be able to logout', function() {
			//Arrange
			$httpBackend.expect('POST', BACKEND_INFO.baseUrl + '/account/token')
				.respond(200, {access_token: 'TestToken'});

			//Act + Assert
			expect(AuthService.isAuthenticated()).toBe(false);

			AuthService.login('TestUser','TestPassword')
				.then(function(response) {
					expect(AuthService.isAuthenticated()).toBe(true);

					AuthService.logout();

					expect(AuthService.isAuthenticated()).toBe(false);
				}, function (response) {
					throw 'Received error callback';
				});
			$httpBackend.flush();
		});


	});

}());