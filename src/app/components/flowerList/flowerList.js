'use strict';
var flowerList = angular.module('flowerList', []);

flowerList.controller('flowerListCtrl', ['$scope', 'flowerStorage', '$q', function ($scope, flowerStorage, $q) {


  $scope.flowers = [];

  $scope.getData = function () {
    flowerStorage.getAllFlowers().then(function (data) {
      $scope.flowers = data.data;
    })
  };

  $scope.getData();
}]);
