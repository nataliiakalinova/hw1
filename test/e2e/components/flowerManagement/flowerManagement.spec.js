(function() {
  'use strict';

  ddescribe('Flower management', function(){

    var form;

    beforeEach(function() {
      console.log("11");

      browser.ignoreSynchronization = true;
      browser.get('#/management');
      form = element(by.name('addFlower'));

    });

    it('should define addFlower form', function () {
      expect(form).toBeDefined();
    });

    it('should validate frequency', function () {
      var frequency = element(by.model('flower.frequency'));
      console.log(frequency);
    });
  });
})();
