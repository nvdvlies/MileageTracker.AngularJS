(function () {
	'use strict';

	describe('Unit: TripService', function() {
		var $httpBackend, TripService, BACKEND_INFO;
		
		beforeEach(function(){
			module('ngRoute');
			module('ngCookies');
			module('ui.bootstrap');
			module('ngTable');
			module('MileageTracker');
		});

		beforeEach(inject(function(_$rootScope_, _$httpBackend_, _TripService_, _BACKEND_INFO_) {
			$httpBackend = _$httpBackend_;
			BACKEND_INFO = _BACKEND_INFO_;
			TripService = _TripService_;
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should make a request to get a paginated list of trips', function() {
			//Arrange
			$httpBackend.expect('GET', BACKEND_INFO.baseUrl + '/trips?pagenumber=1&pagesize=15')
				.respond(200);
			
			var successCallback = jasmine.createSpy('successCallback');
			var errorCallback = jasmine.createSpy('errorCallback');

			//Act
			TripService.getTripsPaginated(1, 15)
				.then(successCallback, errorCallback);

			//Assert
			$httpBackend.flush();

			expect(successCallback).toHaveBeenCalled();
			expect(errorCallback).not.toHaveBeenCalled();
		});

		it('should make a request to retrieve a single trip', function() {
			//Arrange
			$httpBackend.expect('GET', BACKEND_INFO.baseUrl + '/trips/42')
				.respond(200);
			
			var successCallback = jasmine.createSpy('successCallback');
			var errorCallback = jasmine.createSpy('errorCallback');

			//Act
			TripService.getById(42)
				.then(successCallback, errorCallback);

			//Assert
			$httpBackend.flush();

			expect(successCallback).toHaveBeenCalled();
			expect(errorCallback).not.toHaveBeenCalled();
		});

		it('should make a request to retrieve a template of a trip', function() {
			//Arrange
			$httpBackend.expect('GET', BACKEND_INFO.baseUrl + '/trips/template')
				.respond(200);
			
			var successCallback = jasmine.createSpy('successCallback');
			var errorCallback = jasmine.createSpy('errorCallback');

			//Act
			TripService.getNewTripTemplate()
				.then(successCallback, errorCallback);

			//Assert
			$httpBackend.flush();

			expect(successCallback).toHaveBeenCalled();
			expect(errorCallback).not.toHaveBeenCalled();
		});

		it('should make a request to save a new trip', function() {
			//Arrange
			var trip = { id: 42 };

			$httpBackend.expect('POST', BACKEND_INFO.baseUrl + '/trips', trip)
				.respond(201, trip);
			
			var successCallback = jasmine.createSpy('successCallback');
			var errorCallback = jasmine.createSpy('errorCallback');

			//Act
			TripService.saveNewTrip(trip)
				.then(successCallback, errorCallback);

			//Assert
			$httpBackend.flush();

			expect(successCallback).toHaveBeenCalled();
			expect(errorCallback).not.toHaveBeenCalled();
		});

		it('should make a request to edit a trip', function() {
			//Arrange
			var trip = { id: 42 };

			$httpBackend.expect('PUT', BACKEND_INFO.baseUrl + '/trips/' + trip.id, trip)
				.respond(200, trip);
			
			var successCallback = jasmine.createSpy('successCallback');
			var errorCallback = jasmine.createSpy('errorCallback');

			//Act
			TripService.updateTrip(trip)
				.then(successCallback, errorCallback);

			//Assert
			$httpBackend.flush();

			expect(successCallback).toHaveBeenCalled();
			expect(errorCallback).not.toHaveBeenCalled();
		});


		it('should make a request to delete a trip', function() {
			//Arrange
			var trip = { id: 42 };

			$httpBackend.expect('DELETE', BACKEND_INFO.baseUrl + '/trips/42')
				.respond(200);
			
			var successCallback = jasmine.createSpy('successCallback');
			var errorCallback = jasmine.createSpy('errorCallback');

			//Act
			TripService.deleteTrip(trip)
				.then(successCallback, errorCallback);

			//Assert
			$httpBackend.flush();

			expect(successCallback).toHaveBeenCalled();
			expect(errorCallback).not.toHaveBeenCalled();
		});

	});

}());