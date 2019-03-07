/*jm - Controllers.js - Yadong Zhu 2018*/
(function() {
    'use strict';
    /* Controllers */
    angular.module('jm.controllers')
    .controller('viewLogCtrl',['$scope','$location','$modal','logs','utilSvc','jmService',
	function($scope,$location,$modal,logs,utilSvc,apiSvc){

        let url=$location.url();
        if (url.indexOf("error")>-1){
            $scope.title = "错误日志";
            $scope.logType = "error";
        } else {
            $scope.logType = "info";
            $scope.title = "操作日志";
        }
        $scope.logs = logs;
        $scope.viewDetail=function(log){
            $scope.log=log;
            var modalInstance;
            modalInstance = $modal.open({
                templateUrl: 'partials/view-log-detail.html',
                windowClass: "sub-detail-modal",
                // backdrop: "static",
                scope:$scope
            });
        };

    }])
 }());
