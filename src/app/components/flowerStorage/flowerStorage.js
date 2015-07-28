'use strict';
var flowerServices = angular.module('flowerServices', []);

flowerServices.factory('flowerStorage', ['$http', function ($http) {
  return {
    getAllFlowers: function () {
      return $http.get('http://localhost:8080/api/flowers')
    },
    removeFlower: function (item) {
      return $http.delete('http://localhost:8080/api/flower/' + item._id);
    },
    createFlower: function (flowerObj) {
      return $http.post('http://localhost:8080/api/flower/', flowerObj);
    },
    editFlower: function (flowerObj) {
      //$http.put('api/flowers/'+flowerObj.id, {menteeId: menteeId});
    }

  }
}]);
