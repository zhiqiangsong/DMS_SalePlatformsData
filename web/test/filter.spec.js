/**
 * Created by Yadong on 14/4/2018.
 */
(function() {
    "use strict";

    var $filter;

    describe("Filter ->", function() {
        beforeEach(module(
            'jm.filters'
        ));

        beforeEach(inject(function(_$filter_) {
            $filter = _$filter_;
        }));

        
        it ('Percentage -> should show a percentage', function() {
            let  percent = $filter("percentage");
            expect(percent(0.94)).toEqual('94%');
        });
    });
})();