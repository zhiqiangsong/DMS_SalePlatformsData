beforeEach(function(){
  module(function($provide) {
    $provide.value('translateFilter', mockTranslateFilter);
      });

      mockTranslateFilter = function(value) {
        return value;
      };
});
describe('Test to print out jasmine version', function() {
    it('prints jasmine version', function() {
        console.log('jasmine-version:' + jasmine.version);
    });
});