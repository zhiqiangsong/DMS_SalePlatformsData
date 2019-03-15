/*jm - Controllers.js - Yadong Zhu 2018*/
(function() {
    'use strict';
    /* Controllers */
    angular.module('jm.controllers')
    .controller('addEditResponsibleMaintenanceCtrl', ['$scope','$rootScope', '$modalInstance','utilSvc','jmService','responsibleMaintenance','agentList','responsibleList','constants',
    	 function($scope,$rootScope,$modalInstance,utilSvc,apiSvc,responsibleMaintenance,agentList,responsibleList,constants){
             $scope.type=responsibleMaintenance?"Edit":"Add";
             $scope.agentList=agentList;
             $scope.responsibleList=responsibleList;
             $scope.uniqueValidation=function(){
                $scope.duplicateUserID=false;
                // if ($scope.responsibleMaintenance.Date != ''){
                //     var date;
                //     if(!($scope.responsibleMaintenance.Date instanceof Date)){
                //         if($scope.responsibleMaintenance.Date.indexOf("年")>-1){
                //             let date_str = $scope.responsibleMaintenance.Date.replace(/年/g,"/");
                //             date_str = date_str.replace(/月/g,"");
                //             date = new Date(date_str);
                //         } else {
                //             date = new Date($scope.responsibleMaintenance.Date);
                //         }
                //     } else {
                //         date = $scope.responsibleMaintenance.Date;
                //     }
                //     var year = date.getFullYear();
                //     var month = date.getMonth()+1;
                //     responsibleMaintenanceList.forEach(_responsibleMaintenance => {
                //         if (_responsibleMaintenance.FID!=$scope.responsibleMaintenance.FID && _responsibleMaintenance.FHospName===$scope.responsibleMaintenance.FHospName && _responsibleMaintenance.DistributorName===$scope.responsibleMaintenance.DistributorName && _responsibleMaintenance.ProductTypeName===$scope.responsibleMaintenance.ProductTypeName &&  _responsibleMaintenance.Year ===year && _responsibleMaintenance.Month ===month){
                //             $scope.duplicateUserID=true;
                //         }
                //     });
                // }
            }
    	 	$scope.submit=function(){
                apiSvc.addEditResponsibleMaintenance({responsibleMaintenance:$scope.responsibleMaintenance})
                .$promise.then(function(responsibleMaintenanceList){
                    if (responsibleMaintenanceList){
                        $modalInstance.close(responsibleMaintenanceList);
                    } else {
                        utilSvc.addAlert("The Operation failed!", "fail", false);
                    }
                },
                function(err){
                    utilSvc.addAlert("The operation failed!", "fail", false);
                })
             }
    	 	$scope.reset=function(){
                $scope.responsibleMaintenance={};
                angular.copy(responsibleMaintenance,$scope.responsibleMaintenance);

                if(responsibleMaintenance){
                    $scope.responsibleMaintenance.agentName=responsibleMaintenance.agentName;
                    $scope.responsibleMaintenance.responsibleName=responsibleMaintenance.responsibleName;
                } else {
                    $scope.responsibleMaintenance.agentName='';
                    $scope.responsibleMaintenance.responsibleName='';
                }
             }
             $scope.reset();
    }])
 }());
