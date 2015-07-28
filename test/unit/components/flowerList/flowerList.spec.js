(function() {
  'use strict';

  describe('Flower list', function(){

    var scope,
      flowerStorage,
      controller,
      q;

    beforeEach(function() {
      module('hw1');
      module('flowerList');

      inject(function($rootScope, $controller, $injector, $q){
        scope = $rootScope.$new();
        q = $q;

        flowerStorage = jasmine.createSpyObj('flowerStorage', ['getAllFlowers']);
        flowerStorage.getAllFlowers.and.returnValue(q.when({ data: [{name: "name"}] }));

        controller = $controller('flowerListCtrl', {$scope: scope, flowerStorage: flowerStorage});
        scope.$apply();
      });
    });

    it('should call flowerStorage method for getting data', function () {
      scope.getData();
      expect(scope.flowers.length).toBe(1);
    });

  });
})();
