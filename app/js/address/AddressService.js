(function() {
  'use strict'; 

  var AddressService = function ($http, $q, BACKEND_INFO) {

    var getAddressesPaginated = function (page, pageSize) {
      return $http({
        method: 'GET', 
        url: BACKEND_INFO.baseUrl + '/addresses', 
        headers: {
          'Accept': 'application/json'
        },
        params: {
          pagenumber: page,
          pagesize: pageSize
        }
      });
    };

    var getAllAddresses = function () {
      var addresses = [];
      var deferred = $q.defer();

      function _getAllAddresses(currentPage) {
        getAddressesPaginated(currentPage, 15)
          .success(function (data) {
            addresses = addresses.concat(data.items);
            if(data.totalPages > currentPage) {
              _getAllAddresses(currentPage+=1);
            } else {
              deferred.resolve(addresses);
            }
          })
          .error(function (data, status) {
            deferred.reject(data);
          })
        ;
      }
      
      _getAllAddresses(1);

      return deferred.promise;
    };

    var getById = function (addressId) {
      return $http({
        method: 'GET', 
        url: BACKEND_INFO.baseUrl + '/addresses/' + addressId, 
        headers: {
          'Accept': 'application/json'
        }
      });
    };

    var saveNewAddress = function (address) {
      return $http({
        method: 'POST', 
        url: BACKEND_INFO.baseUrl + '/addresses', 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: address
      });
    };

    var updateAddress = function (address) {
      return $http({
        method: 'PUT', 
        url: BACKEND_INFO.baseUrl + '/addresses/' + address.id, 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: address
      });
    };

    var deleteAddress = function (address) {
      return $http({
        method: 'DELETE', 
        url: BACKEND_INFO.baseUrl + '/addresses/' + address.id
      });
    };

    return {
      getAddressesPaginated: getAddressesPaginated,
      getAllAddresses: getAllAddresses,
      getById: getById,
      saveNewAddress: saveNewAddress,
      updateAddress: updateAddress,
      deleteAddress: deleteAddress
    };
  };
 
  angular
    .module("MileageTracker")
    .factory("AddressService", AddressService);
}());
