var assert = require('assert');
describe('return formatted date and time', ()=> {
    it('convert original TO to the one with only required fields for picking', ()=> {
        var util = require('./../api/config/util');
        var d= util.formatDateTime('2018-05-09T00:00:00.000Z');
        // console.log(d);
      assert.equal(d.date, '20180509');
      assert.equal(d.time, '080000');
      assert.equal(d.utcDateTime, '20180509 00:00:00');
    });
});

