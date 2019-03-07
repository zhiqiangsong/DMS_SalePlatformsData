/*jm - services.js - Yadong Zhu 2017*/ (function() {
    'use strict';
    angular.module('jm.services')
    .service('authSvc',['$rootScope','$timeout','jmService',function($rootScope,$timeout,apiSvc){
        var userObj,isLogin;
        $rootScope.$on("loginStautsChange",function(){
            console.log("receive event:loginStautsChange");
            $rootScope.authUser = userObj;
            $rootScope.isLogin=isLogin;
        })
        return {
            setStatus:function(status,user,baseUrl){
                //use case: 1. from not login status to login status, or 
                //          2. from user1 to user2 (different user logged in from another browser tab,etc)
                if (status==="login"&&(!isLogin||user.id!==userObj.id)){//if not login or userid is different
                    userObj=user;
                    isLogin=true;
                    $rootScope.baseUrl=baseUrl;
                    $rootScope.$broadcast("loginStautsChange");
                } //login status from login to logout
                else if (status==="logout"&&isLogin){  
                    userObj=undefined;
                    isLogin=false;
                    $rootScope.$broadcast("loginStautsChange");
                }
            },
            checkLoginStatus:function(){
                if (!$rootScope.authUser){
                    $timeout(function(){
                        apiSvc.checkLoginStatus();
                    },10)
                }
            },
            user:function(){
                return userObj;
            },
            isLogin:function(){
                return isLogin;
            }
        }

    }])
    ;
}());
