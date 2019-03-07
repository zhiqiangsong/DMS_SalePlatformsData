/*jm - Controllers.js - Yadong Zhu 2018*/
(function() {
    'use strict';
    /* Controllers */
    angular.module('jm.controllers')
    .controller('homeCtrl',['$scope','$http','$location', 
    function($scope,$http,$location){
        $scope.url = $location.absUrl();
        $http.get('/db-info.json').then(function(res){
            if (res){
                $scope.dbInfo=res.data;
            } 
        },function(err){
            console.error(err);
        })
    }])
 }());
