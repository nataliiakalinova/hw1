(function() {
  'use strict';

  describe('Flower storage', function(){

    var scope,
        httpBackend,
        flowerStorage,
        success = "success",
        error = "error",
        successCallback,
        errorCallback,
        flower = {_id: 1, name: "name", frequency: "1", amount: "1", comment: ""};

    beforeEach(function() {
      module('hw1');
      module('flowerServices');

      inject(function($rootScope, $httpBackend, $injector){
        scope = $rootScope.$new();
        flowerStorage = $injector.get('flowerStorage');
        httpBackend = $injector.get('$httpBackend');
        successCallback = jasmine.createSpy();
        errorCallback = jasmine.createSpy();
      });
    });

    it('should get data from DB', function () {
      httpBackend.when('GET', 'http://localhost:8080/api/flowers').respond(200, success);
      flowerStorage.getAllFlowers().then(function (data) { expect(data.data).toEqual(success); });
      httpBackend.flush();
    });

    it('should call errorCallback when get is fail', function () {
      httpBackend.when('GET', 'http://localhost:8080/api/flowers').respond(400, error);
      flowerStorage.getAllFlowers().then(successCallback, errorCallback);
      httpBackend.flush();
      expect(errorCallback).toHaveBeenCalled();
    });

    it('should save data', function () {
      httpBackend.when('POST', 'http://localhost:8080/api/flower/').respond(200, success);
      flowerStorage.createFlower(flower).then(function (data) { expect(data.data).toEqual(success); });
      httpBackend.flush();
    });

    it('should call errorCallback when save is fail', function () {
      httpBackend.when('POST', 'http://localhost:8080/api/flower/').respond(400, error);
      flowerStorage.createFlower(flower).then(successCallback, errorCallback);
      httpBackend.flush();
      expect(errorCallback).toHaveBeenCalled();
    });

    it('should delete data', function () {
      httpBackend.when('DELETE', 'http://localhost:8080/api/flower/'+flower._id).respond(200, success);
      flowerStorage.removeFlower(flower).then(function (data) { expect(data.data).toEqual(success); });
      httpBackend.flush();
    });

    it('should call errorCallback when delete is fail', function () {
      httpBackend.when('DELETE', 'http://localhost:8080/api/flower/'+flower._id).respond(400, error);
      flowerStorage.removeFlower(flower).then(successCallback, errorCallback);
      httpBackend.flush();
      expect(errorCallback).toHaveBeenCalled();
    });

  });
})();
