/*jm - services.js - Yadong Zhu 2017*/ (function() {
    'use strict';
    angular.module('jm.services')
    .service('modalLogin',['$http', '$modal','$location','$rootScope',
        function($http, $modal,$location,$rootScope) {
            return {
                do:function(){
                    var modalInstance = $modal.open({
                        templateUrl: 'partials/loginModal.html',
                        controller: 'loginCtrl'
                    });
                    $rootScope.$on("loginStautsChange",function(){
                        if (modalInstance)
                            modalInstance.close();
                    })
                    modalInstance.result.then(function() {
                        // isLoggingIn = true;
                    }, function(path) {
                        console.log("login rejected");
                         $location.path("/home");
                    })['finally'](function() {
                        modalInstance = undefined;
                    });
                }
            }
        }
    ])
    ;
}());
