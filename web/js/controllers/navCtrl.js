/*jm - Controllers.js - Yadong Zhu 2018*/
(function() {
    'use strict';
    /* Controllers */
    angular.module('jm.controllers')
    .controller('navCtrl', ['$scope', '$rootScope','$location', function($scope,$rootScope,$location){
    	$scope.toggleDebug=function(){
    		$rootScope.debug=!$rootScope.debug;
    	}
    	
    }])
 }());
