/*jm - App.js - Yadong Zhu 2018*/
(function() {
    'use strict';
    angular.module('jm')
    //set global 
    .run(["$rootScope","$window","$locale","$location","utilSvc","dynamicLocale","jmService","modalLogin",
            function($rootScope,$window,$locale,$location,utilSvc,dynamicLocale,apiSvc,modalLogin) {
              $locale.id="zh-cn";
              dynamicLocale.setLocale($locale);
              $rootScope.debug=$location.search().debug;
              $rootScope.login=function(){
                  modalLogin.do();
              }
              $rootScope.logout=function(){
                  apiSvc.logout();
              }
              $rootScope.$on('$locationChangeSuccess', function(event){
                      var url = $location.url(),
                          params = $location.search();
                      console.log("locationChangeSuccess:"+url);
                      $rootScope.currentUrl=$location.url();
              })
    }])
}());
(function() {
    'use strict';
    angular.module('jm')
   .config(['localStorageServiceProvider', function(localStorageServiceProvider){
            localStorageServiceProvider.setPrefix('jm');
            localStorageServiceProvider.setStorageType('sessionStorage');
             localStorageServiceProvider.setNotify(true, true);
        }]);
}());

