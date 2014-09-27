(function () {
  'use strict';

  describe('Unit: AccountController', function() {
    var scope, createController;
    
    beforeEach(function(){
      module('ngRoute');
      module('ngCookies');
      module('ui.bootstrap');
      module('ngTable');
      module('MileageTracker');
    });

    beforeEach(inject(function($injector) {
      scope = $injector.get('$rootScope').$new();

      var $controller = $injector.get('$controller');
      createController = function() {
        return $controller('AccountController', {'$scope' : scope});
      };
    }));

    it('should be able to login', inject(function ($q, AuthService, $location) {
      //Arrange
      var controller = createController();

      scope.user = {
        username: 'TestUser', 
        password: 'TestPassword'
      };

      var deferred = $q.defer();
      spyOn(AuthService, 'login').andReturn(deferred.promise);

      spyOn($location, 'path');

      //Act
      scope.login(scope.user);

      //Assert
      expect(AuthService.login).toHaveBeenCalled();
      expect(AuthService.login).toHaveBeenCalledWith(scope.user.username, scope.user.password);

      deferred.resolve();
      scope.$digest();

      expect(scope.alerts).toEqual([]);
      expect($location.path).toHaveBeenCalled();
      expect($location.path).toHaveBeenCalledWith('/');

    }));

    it('should show an error after invalid login', inject(function ($q, AuthService) {
      //Arrange
      var controller = createController();

      scope.user = {
        username: 'InvalidUser', 
        password: 'InvalidPassword'
      };

      var deferred = $q.defer();
      spyOn(AuthService, 'login').andReturn(deferred.promise);

      //Act
      scope.login(scope.user);

      //Assert
      expect(AuthService.login).toHaveBeenCalled();
      expect(AuthService.login).toHaveBeenCalledWith(scope.user.username, scope.user.password);

      deferred.reject({ data: 'some error' });
      scope.$digest();

      expect(scope.alerts.length).toEqual(1);
      
    }));

    it('should be able to register', inject(function ($q, AuthService) {
      //Arrange
      var controller = createController();

      scope.user = {
        username: 'TestUser', 
        password: 'TestPassword',
        confirmPassword: 'TestPassword'
      };

      var deferred = $q.defer();
      spyOn(AuthService, 'register').andReturn(deferred.promise);

      spyOn(scope, 'login');

      //Act
      scope.register(scope.user);

      //Assert
      expect(AuthService.register).toHaveBeenCalled();
      expect(AuthService.register).toHaveBeenCalledWith(scope.user.username, scope.user.password, scope.user.confirmPassword);

      deferred.resolve();
      scope.$digest();

      expect(scope.login).toHaveBeenCalled();

      expect(scope.alerts).toEqual([]);

    }));


    it('should show an error after incorrect registration', inject(function ($q, AuthService) {
      //Arrange
      var controller = createController();

      scope.user = {
        username: 'InvalidUser', 
        password: 'InvalidPassword',
        confirmPassword: 'InvalidPassword'
      };

      var deferred = $q.defer();
      spyOn(AuthService, 'register').andReturn(deferred.promise);

      spyOn(scope, 'login');

      //Act
      scope.register(scope.user);

      //Assert
      expect(AuthService.register).toHaveBeenCalled();
      expect(AuthService.register).toHaveBeenCalledWith(scope.user.username, scope.user.password, scope.user.confirmPassword);

      deferred.reject({ data: 'some error' });
      scope.$digest();

      expect(scope.login).not.toHaveBeenCalled();

      expect(scope.alerts.length).toEqual(1);

    }));
  
  });

}());