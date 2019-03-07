/*jm - controllers.js - Yadong Zhu 2018*/
(function() {
    'use strict';
    angular.module('jm.controllers')
    .controller("loginCtrl",[ "$scope",'$route','$location', "jmService","localStorageService",
					function($scope, $route,$location, apiSvc,cacheSvc) {
						$scope.login = {
							username : "",
							password : "",
							domain: "JWMS"
						};

						$scope.submitForm = function() {
							apiSvc.login($scope.login).$promise.then(function(data) {
                                if (data.loginUser){
								    console.log("login callback:" + data.loginUser.name);
                                    if ($location.path()!=='/home')
    								    $route.reload();
                                    else 
                                        $location.path("/")
                                } else if (data&&data.status===401){
                                    $scope.login.errMsg ='LOGIN_ERROR_MSG';
                                }
							}, function(err) {
								console.error("login fail:" + (err.data.message||err.status));
								$scope.login.errMsg = err.data.message||err.statusText||"Username or password incorrect!";

							})
						};
						if (cacheSvc.get("login")){
							$scope.login=cacheSvc.get("login")
							$scope.submitForm();
						}
					} 
		]);
}());
