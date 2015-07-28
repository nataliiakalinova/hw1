(function() {
  'use strict';

  angular
    .module('hw1')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      }).when('/management', {
        templateUrl: 'app/components/flowerManagement/flowerManagement.html',
        controller: 'flowerManagementCtrl',
        controllerAs: 'management'
      }).when('/list', {
        templateUrl: 'app/components/flowerList/flowerList.html',
        controller: 'flowerListCtrl',
        controllerAs: 'list'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
