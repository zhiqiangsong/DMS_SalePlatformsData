/*jm - Controllers.js - Yadong Zhu 2018*/
(function() {
    'use strict';
    /* Controllers */
    angular.module('jm.controllers')
    .controller('addEditUserCtrl', ['$scope','$rootScope', '$modalInstance','utilSvc','jmService','user','userList','constants',
    	 function($scope,$rootScope,$modalInstance,utilSvc,apiSvc,user,userList,constants){

             $scope.type=user?"Edit":"Add";
             $scope.userRoles = constants.userRoles;

    	 	$scope.submit=function(){

                apiSvc.addEditUser({user:$scope.user})
                .$promise.then(function(userList){
                    if (userList){
                        $modalInstance.close(userList);
                    } else {
                        utilSvc.addAlert("The Operation failed!", "fail", false);
                    }
                },
                function(err){
                    utilSvc.addAlert("The operation failed!", "fail", false);
                })
             }
            $scope.uniqueValidation=function(){
                $scope.duplicateUserID=false;
                userList.forEach(_user => {
                    if (_user.UserID===$scope.user.UserID){
                        $scope.duplicateUserID=true;
                    }
                });
            }
    	 	$scope.reset=function(){
                $scope.user={};
                angular.copy(user,$scope.user);
                $scope.user.isActive=($scope.user.isActive===undefined)?'1':$scope.user.isActive;
                $scope.user.DefaultWH=$scope.user.DefaultWH||$rootScope.authUser.DefaultWH;
                $scope.user.Domain=$scope.user.Domain||$rootScope.authUser.Domain;
                $scope.user.UserRole=$scope.user.UserRole||"normal";
                if ($rootScope.authUser.UserRole==="qaAdmin"){
                    $scope.user.UserRole="qaLab";
                    $scope.roleFilter="qa";
                } else if ($rootScope.authUser.UserRole==="whAdmin"){
                    $scope.user.UserRole="wh"
                    $scope.roleFilter="wh"
                }
             }
             $scope.reset();
    }])
 }());
