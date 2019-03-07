/**
 * Created by Yadong on 14/4/2018.
 */
(function() {
    "use strict";

    var utilSvc;

    describe("Service ->", function() {
        beforeEach(module(
            'ngResource',
            'jm.services'
        ));

        beforeEach(inject(function(_utilSvc_) {
            utilSvc = _utilSvc_;
        }));

        
        it ('utilSvc.isServerRequest -> should tell a url as server request', function() {
            let  url = "/jmapi/login.json"
            expect(utilSvc.isServerRequest(url)).toBeTruthy()
            
            // expect(bInfo).toEqual({"isValid":true,"EANCode":"08888893016399","expiry":"141113","batchNo":"W131004584","serialNo":"1803W189"});
            // // expect(bInfo.isValid).tBoeFalsy();
        });
        it ('utilSvc.isServerRequest -> should tell a url as server request', function() {
            let  url = "/login.json"
            expect(utilSvc.isServerRequest(url)).toBeFalsy()
            
            // expect(bInfo).toEqual({"isValid":true,"EANCode":"08888893016399","expiry":"141113","batchNo":"W131004584","serialNo":"1803W189"});
            // // expect(bInfo.isValid).tBoeFalsy();
        });
       

        

    });
})();