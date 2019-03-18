/*jm - Controllers.js - zhiqiangsong 2019*/
(function() {
    'use strict';
    /* Controllers */
    angular.module('jm.controllers')
    .controller('responsibleMaintenanceCtrl',['$scope','$rootScope','$location','$modal','responsibleMaintenanceList','agentList','responsibleList','utilSvc','jmService','constants',
	function($scope,$rootScope,$location,$modal,responsibleMaintenanceList,agentList,responsibleList,utilSvc,apiSvc,constants){
        $scope.temp={};
        $scope.responsibleMaintenanceSearch={};
        if (responsibleMaintenanceList){
             $scope.responsibleMaintenanceList = responsibleMaintenanceList;
             $scope.agentList = agentList;
             $scope.responsibleList = responsibleList;
             $scope.totalItems = responsibleMaintenanceList.length;
             $scope.itemPerPage = constants.pageMessage.itemPerPage;
             $scope.currentPage = constants.pageMessage.currentPage;
             $scope.maxSize = constants.pageMessage.maxSize;
             $scope.pageChanged=function(){
                 $scope.responsibleMaintenanceListByPage=[];
                 var startData = $scope.itemPerPage * ($scope.currentPage-1);
                 var endData = $scope.itemPerPage * $scope.currentPage-1;
                 if(endData>$scope.totalItems){
                     endData = $scope.totalItems-1
                 }
                 var num = 0;                
                 if($scope.responsibleMaintenanceListByPage){
                     for(var i = startData;i<=endData;i++){
                         if($scope.responsibleMaintenanceList[i]!=undefined){
                             $scope.responsibleMaintenanceListByPage[num]=$scope.responsibleMaintenanceList[i];
                         }
                         num++;
                     }
                 }
             };
             $scope.pageChanged();
         }

        $scope.addOrEditDealerSalesData=function(responsibleMaintenance){
            /* var modalInstance;
            modalInstance = $modal.open({
                templateUrl: 'partials/add-edit-business-price.html',
                windowClass: "sub-detail-modal",
                controller: "addEditBusinessPriceCtrl",
                backdrop: "static",
                resolve:{
                    businessPrice:function(){return businessPrice;},
                    businessPriceList:function(){return $scope.businessPriceList},
                    hospitalList:function(){return hospitalList},
                    agentList:function(){return agentList},
                    productTypeList:function(){return productTypeList}
                }
            });
            modalInstance.result.then(function(responsibleMaintenanceList) {
                $scope.responsibleMaintenanceList = responsibleMaintenanceList;
                $scope.adjustmentData();
            }); */
            $location.path("/responsibleMaintenanceMaintenance/"+responsibleMaintenance.FID);
        };

        $scope.addOrEditResponsibleMaintenance=function(responsibleMaintenance){
            var modalInstance;
            modalInstance = $modal.open({
                templateUrl: 'partials/add-edit-responsible-maintenance.html',
                windowClass: "sub-detail-modal",
                controller: "addEditResponsibleMaintenanceCtrl",
                backdrop: "static",
                resolve:{
                    responsibleMaintenance:function(){return responsibleMaintenance},
                    agentList:function(){return $scope.agentList},
                    responsibleList:function(){
                        return $scope.responsibleList}
                }
            });
            modalInstance.result.then(function(responsibleMaintenanceList) {
                $scope.responsibleMaintenanceList = responsibleMaintenanceList;
                $scope.adjustmentData();
            });
        };

        $scope.copyBusinessPrice=function(){
            var modalInstance;
            modalInstance = $modal.open({
                templateUrl: 'partials/copy-business-price.html',
                windowClass: "sub-detail-modal",
                controller: "copyBusinessPriceCtrl",
                backdrop: "static",
                resolve:{
                    productTypeList:function(){return productTypeList}
                }
            });
            modalInstance.result.then(function(businessPriceList) {
                $scope.businessPriceList = businessPriceList;
                $scope.adjustmentData();
            });
        };
        $scope.deleteResponsibleMaintenance=function(responsibleMaintenance){
            apiSvc.deleteResponsibleMaintenance({responsibleMaintenance:responsibleMaintenance,agentName:$rootScope.agentRMQuery,responsibleName:$rootScope.responsibleRMQuery}).$promise.then(
                function(data){
                    $scope.responsibleMaintenanceList = data;
                    $scope.adjustmentData();
                },
                function(err){
                    if (err.data&&err.data.message)
                        utilSvc.addAlert(err.data.message, "fail", false);
                    else
                        utilSvc.addAlert(JSON.stringify(err), "fail", false);
                }) 
        };

        $scope.queryResponsibleMaintenance=function(){
            $rootScope.agentRMQuery = $scope.responsibleMaintenanceSearch.agent;
            $rootScope.responsibleRMQuery = $scope.responsibleMaintenanceSearch.responsible;
            apiSvc.getResponsibleMaintenanceList({agentName:$scope.responsibleMaintenanceSearch.agent,responsibleName:$scope.responsibleMaintenanceSearch.responsible}).$promise.then(
                function(data){
                    $scope.responsibleMaintenanceList = data;
                    $scope.adjustmentData();
                },
                function(err){
                    if (err.data&&err.data.message)
                        utilSvc.addAlert(err.data.message, "fail", false);
                    else
                        utilSvc.addAlert(JSON.stringify(err), "fail", false);
                }) 
        };

        $scope.adjustmentData=function(){
            $scope.responsibleMaintenanceListByPage=[];
            var startData = $scope.itemPerPage * ($scope.currentPage-1);
            var endData = $scope.itemPerPage * $scope.currentPage-1;
            $scope.totalItems = $scope.responsibleMaintenanceList.length;
            if(endData>$scope.responsibleMaintenanceList.length){
                endData = $scope.responsibleMaintenanceList.length-1
            }
            var num = 0;
            if($scope.responsibleMaintenanceList){
                for(var i = startData;i<=endData;i++){
                    if($scope.responsibleMaintenanceList[i]!=undefined){
                        $scope.responsibleMaintenanceListByPage[num]=$scope.responsibleMaintenanceList[i];
                    }
                    num++;
                }
            }
        }

        $scope.dateToString = function(date){
            var year = date.getFullYear(); 
            var month =(date.getMonth() + 1).toString(); 
            var day = (date.getDate()).toString();  
            if (month.length == 1) { 
                month = "0" + month; 
            } 
            if (day.length == 1) { 
                day = "0" + day; 
            }
            var dateTime = year + "-" + month + "-" + day;
            return dateTime;
        }

    }])
 }());
