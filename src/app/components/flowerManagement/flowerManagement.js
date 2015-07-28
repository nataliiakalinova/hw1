'use strict';
var flowerManagement = angular.module('flowerManagement', []);

flowerManagement.controller('flowerManagementCtrl',['$scope', 'flowerStorage', function($scope, flowerStorage){

  $scope.flower = {};

  $scope.createFlower = function () {
    flowerStorage.createFlower($scope.flower).then(function (data) {
      $scope.flowers = data.data;
    });
    $scope.flower = {};
  };

  $scope.flowers = [];

  $scope.getData = function () {
    flowerStorage.getAllFlowers().then(function (data) {
      $scope.flowers = data.data;
    })
  };

  $scope.delete = function (item) {
    flowerStorage.removeFlower(item).then(function (data) {
      $scope.flowers = data.data;
    });
  };

  $scope.getData();

}] );
