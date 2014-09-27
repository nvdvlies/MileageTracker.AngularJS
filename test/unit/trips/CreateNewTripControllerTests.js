(function () {
  'use strict';

  describe('Unit: CreateNewTripController', function() {
    var scope, createController;
    var TripService, AddressService, CarService;

    beforeEach(function(){
      module('ngRoute');
      module('ngCookies');
      module('ui.bootstrap');
      module('ngTable');
      module('MileageTracker');
    });

    beforeEach(inject(function($injector) {
      scope = $injector.get('$rootScope').$new();

      TripService = $injector.get('TripService');
      AddressService = $injector.get('AddressService');
      CarService = $injector.get('CarService');

      var $controller = $injector.get('$controller');
      createController = function() {
        return $controller('CreateNewTripController', {'$scope' : scope});
      };
     }));

    it('should have addresses after init', inject(function ($q) {
      //Arrange
      var addresses = [
        { id: 1 },
        { id: 2 }
      ];

      var deferred = $q.defer();
      spyOn(AddressService, 'getAllAddresses').andReturn(deferred.promise);
      spyOn(CarService, 'getAllCars').andReturn($q.defer().promise);
      spyOn(TripService, 'getNewTripTemplate').andReturn($q.defer().promise);

      var controller = createController();

      //Act
      deferred.resolve(addresses);
      scope.$digest();

      //Assert
      expect(AddressService.getAllAddresses).toHaveBeenCalled();
      expect(scope.addresses).toEqual(addresses);
      expect(scope.alerts).toEqual([]);
    }));

    it('should have cars after init', inject(function ($q) {
      //Arrange
      var cars = [
        { id: 1 },
        { id: 2 }
      ];

      var deferred = $q.defer();
      spyOn(CarService, 'getAllCars').andReturn(deferred.promise);
      spyOn(AddressService, 'getAllAddresses').andReturn($q.defer().promise);
      spyOn(TripService, 'getNewTripTemplate').andReturn($q.defer().promise);

      var controller = createController();

      //Act
      deferred.resolve(cars);
      scope.$digest();

      //Assert
      expect(CarService.getAllCars).toHaveBeenCalled();

      expect(scope.cars).toEqual(cars);
      expect(scope.alerts).toEqual([]);
    }));


    it('should have a trip template after init', inject(function ($q) {
      //Arrange
      var trip = {
        id: 42
      };

      var deferred = $q.defer();
      spyOn(TripService, 'getNewTripTemplate').andReturn(deferred.promise);
      spyOn(CarService, 'getAllCars').andReturn($q.defer().promise);
      spyOn(AddressService, 'getAllAddresses').andReturn($q.defer().promise);

      var controller = createController();

      //Act
      deferred.resolve({ data: trip });
      scope.$digest();

      //Assert
      expect(TripService.getNewTripTemplate).toHaveBeenCalled();

      expect(scope.trip).toEqual(trip);
      expect(scope.alerts).toEqual([]);
    }));

    it('should be able to save a trip', inject(function ($q, $location) {
      //Arrange
      var trip = {
        id: 42
      };

      spyOn(TripService, 'getNewTripTemplate').andReturn($q.defer().promise);
      spyOn(CarService, 'getAllCars').andReturn($q.defer().promise);
      spyOn(AddressService, 'getAllAddresses').andReturn($q.defer().promise);

      var controller = createController();

      var deferred = $q.defer();
      spyOn(TripService, 'saveNewTrip').andReturn(deferred.promise);

      spyOn($location, 'path');

      //Act
      scope.saveTrip(trip);

      deferred.resolve();
      scope.$digest();

      //Assert
      expect(TripService.saveNewTrip).toHaveBeenCalled();
      expect(TripService.saveNewTrip).toHaveBeenCalledWith(trip);

      expect(scope.alerts).toEqual([]);
      expect($location.path).toHaveBeenCalled();
      expect($location.path).toHaveBeenCalledWith('/');

    }));

    it('should show an error after saving an invalid trip', inject(function ($q) {
      //Arrange
      var trip = {
        id: 42
      };

      spyOn(TripService, 'getNewTripTemplate').andReturn($q.defer().promise);
      spyOn(CarService, 'getAllCars').andReturn($q.defer().promise);
      spyOn(AddressService, 'getAllAddresses').andReturn($q.defer().promise);

      var controller = createController();

      var deferred = $q.defer();
      spyOn(TripService, 'saveNewTrip').andReturn(deferred.promise);


      //Act
      scope.saveTrip(trip);

      //Assert
      expect(TripService.saveNewTrip).toHaveBeenCalled();
      expect(TripService.saveNewTrip).toHaveBeenCalledWith(trip);

      deferred.reject({ data: 'error' });
      scope.$digest();

      expect(scope.alerts.length).toEqual(1);
    }));

    it('should redirect to / on cancel', inject(function ($q, $location) {
      //Arrange
      spyOn(TripService, 'getNewTripTemplate').andReturn($q.defer().promise);
      spyOn(CarService, 'getAllCars').andReturn($q.defer().promise);
      spyOn(AddressService, 'getAllAddresses').andReturn($q.defer().promise);

      var controller = createController();

      spyOn($location, 'path');

      //Act
      scope.cancel();

      //Assert
      expect($location.path).toHaveBeenCalled();
      expect($location.path).toHaveBeenCalledWith('/');

    }));
  });

}());