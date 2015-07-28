(function() {
  'use strict';

  describe('Flower Management', function(){

    var scope,
      flowerStorage,
      controller,
      q;

    beforeEach(function() {
      module('hw1');
      module('flowerManagement');

      inject(function($rootScope, $controller, $injector, $q){
        scope = $rootScope.$new();
        q = $q;

        flowerStorage = jasmine.createSpyObj('flowerStorage', ['getAllFlowers', 'removeFlower']);
        flowerStorage.getAllFlowers.and.returnValue(q.when({ data: [{name: "name"}] }));
        flowerStorage.removeFlower.and.returnValue(q.when({}));

        controller = $controller('flowerManagementCtrl', {$scope: scope, flowerStorage: flowerStorage});
        scope.$apply();
      });
    });

    it('should call flowerStorage method for getting data', function () {
      scope.getData();
      expect(scope.flowers.length).toBe(1);
    });

    it('should call flowerStorage method for deleting data', function () {
      scope.delete();
      expect(flowerStorage.removeFlower).toHaveBeenCalled();
    });

  });
})();
