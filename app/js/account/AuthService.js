(function() {
  'use strict'; 
  
  var AuthService = function ($http, $rootScope, $cookieStore, BACKEND_INFO) {
    var user = {
      username: null, 
      token: null
    };

    var init = function () {
      user = $cookieStore.get('session');
      resetAuthorization();
    };

    var register = function (username, password, confirmPassword) {
      return $http({
        method: 'POST', 
        url: BACKEND_INFO.baseUrl + '/account/register', 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: {
          'userName': username,
          'password': password, 
          'confirmPassword': confirmPassword
        }
      });
    };

    var login = function (username, password) {
      return $http({
        method: 'POST',
        url: BACKEND_INFO.baseUrl + '/account/token', 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        data: 'grant_type=password&username=' + username + '&password=' + password,
      })
      .success(function(data){
        setUser(username, data.access_token);
      });
    };

    var setUser = function (username, token) {
      user = { 
        username: username, 
        token: token
      };
      resetAuthorization();
    };

    var getUser = function () {
      return user;
    };

    var logout = function () {
      user = { 
        username: null, 
        token: null
      };
      resetAuthorization();
    };

    var setAuthorizationHeader = function (token) {
      $http.defaults.headers.common.Authorization = 'Bearer ' + token;
    };

    var clearAuthorizationHeader = function () {
      delete $http.defaults.headers.common.Authorization;
    };

    var resetAuthorization = function () {
      if (isAuthenticated()) {
        $cookieStore.put('session', user);
        setAuthorizationHeader(user.token);
      } else {
        $cookieStore.remove('session');
        clearAuthorizationHeader();
      } 
    };

    var isAuthenticated = function () {
      if (user !== undefined && user.token) {
        return true;
      } else {
        return false;
      }
    };

    $rootScope.$on('account_invalid_token', function(event, data) {
      logout();
    });

    init();

    return {
      register: register,
      login: login,
      getUser: getUser,
      isAuthenticated: isAuthenticated,
      logout: logout
    };
  };
 
  angular
    .module("MileageTracker")
    .factory("AuthService", AuthService);
}());
