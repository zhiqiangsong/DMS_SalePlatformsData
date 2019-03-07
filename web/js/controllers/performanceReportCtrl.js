/*jm - Controllers.js - Yadong Zhu 2018*/
(function() {
    'use strict';
    /* Controllers */
    angular.module('jm.controllers')
    .controller('performanceReportCtrl',['$scope','$routeParams','$location', 'report','utilSvc',
        function($scope,$routeParams,$location,report,utilSvc){
          $scope.temp={};
          
          if (report){
            $scope.report=report;

            } else {
              $scope.clear = function () {
                $scope.temp.dt = null;
              };
              $scope.submitForm = function() {
                //add leading 0 to the scanned order no
                $location.path("/report/"+utilSvc.formatDate($scope.temp.dt));
            }
            }
    }])
 }());
