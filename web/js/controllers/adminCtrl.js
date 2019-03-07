/*jm - Controllers.js - Yadong Zhu 2018*/
(function() {
    'use strict';
    /* Controllers */
    angular.module('jm.controllers')
    .controller('adminCtrl',['$scope','$rootScope','$interval','$modal','userList','utilSvc','jmService',
	function($scope,$rootScope,$interval,$modal,userList,utilSvc,apiSvc){

        $scope.userList = userList;
        $rootScope.$on("loginStautsChange",function(){
            if (!$rootScope.authUser) return;
            if ($rootScope.authUser.UserRole==="qaAdmin"){
                $scope.roleFilter=function(val){
                    return val==='qaLab'||val==='qaAdmin';
                }
                $scope.roleFilter='qa'
            } else if ($rootScope.authUser.UserRole==="whAdmin"){
                $scope.roleFilter="wh"
            } 
        })
        let waitForUser = $interval(function() {
            if ($rootScope.authUser) {
                $interval.cancel(waitForUser);
                if ($rootScope.authUser.UserRole==="qaAdmin"){
//                     $scope.roleFilter="qaLab";
                } else if ($rootScope.authUser.UserRole==="whAdmin"){
                    $scope.roleFilter="wh"
                } 
            }
          }, 10);

        $scope.addOrEditUser=function(user){
            var modalInstance;
            modalInstance = $modal.open({
                templateUrl: 'partials/add-edit-user.html',
                windowClass: "sub-detail-modal",
                controller: "addEditUserCtrl",
                backdrop: "static",
                resolve:{
                    user:function(){return user;},
                    userList:function(){return $scope.userList}
                }
            });
            modalInstance.result.then(function(userList) {
                $scope.userList = userList;
            });
        };
        $scope.deleteUser=function(user){
            apiSvc.deleteUser({user:user}).$promise.then(
                function(data){
                    $scope.userList = data
                },
                function(err){
                    if (err.data&&err.data.message)
                        utilSvc.addAlert(err.data.message, "fail", false);
                    else
                        utilSvc.addAlert(JSON.stringify(err), "fail", false);
                }) 
        }

    }])
 }());
