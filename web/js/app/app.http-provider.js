/*jm - App.js - Yadong Zhu 2018*/
(function() {
    'use strict';
    angular.module('jm')
    .config(['$httpProvider',
            function($httpProvider) {
                $httpProvider.interceptors.push(['$q', '$injector',
                    function($q, $injector,$cookies) {
                        var isLoggingIn = false;
                        return {
                            request: function(config) {
                                config.requestTimestamp = new Date().getTime();
                                return config || $q.when(config);
                            },
                            response:function(response){
                                response.config.responseTimestamp = new Date().getTime();
                                var util = $injector.get("utilSvc");
                                if (util.isServerRequest(response.config.url)){
                                    // console.log("response.config.url="+response.config.url);
                                    var auth = $injector.get("authSvc");
                                    if(response.data&&response.data.loginUser){
                                        auth.setStatus("login",response.data.loginUser,response.data.baseUrl);
                                    } else if(response.data&&"logout"===response.data.loginStatus){
                                         auth.setStatus("logout");
                                    } else {
                                        auth.checkLoginStatus();
                                    }
                                }
                                return response;
                            },
                            responseError: function(response) {
                                console.log("response.config.url="+response.config.url);
                                $injector.get("utilSvc").pageLoading("stop");
                                if (response.status === 401) {
                                    //log user out:
                                    $injector.get("authSvc").setStatus("logout");
                                    $injector.get("modalLogin").do();
                                    return $q(function () { return null; })
                                } else if  (response.status === 403) {
                                    if(response.data&&response.data.loginUser)
                                        auth.setStatus("login",response.data.loginUser,response.data.baseUrl);
                                    $injector.get("utilSvc").addAlert("You are NOT authorized to access this module!", "fail", true);
                                    // $injector.get("$location").path("/home");
                                    return $q(function () { return null; }) // cancels the promise. stop all the reset handling in controller
                                }
                                return $q.reject(response);
                            }
                        };
                    }
                ]);
            }
        ]);
}());

