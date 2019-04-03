/*jm - Controllers.js - Yadong Zhu 2018*/
(function() {
    'use strict';
    /* Controllers */
    angular.module('jm.controllers')
    .controller('addDealerSalesDataCtrl', ['$scope','$rootScope','$location', '$modalInstance','utilSvc','jmService','dealerSalesDataList','productTypeList','constants',
    	 function($scope,$rootScope,$location,$modalInstance,utilSvc,apiSvc,dealerSalesDataList,productTypeList,constants){
             $scope.productTypeList=productTypeList;

             $scope.uniqueValidation=function(){
                $scope.duplicateUserID=false;
            }
    	 	$scope.submit=function(){
                //$scope.businessPrice.maintainerName = $rootScope.authUser.userName;
                $scope.dealerSalesData.userName = $rootScope.authUser.userName;
                apiSvc.addDealerSalesData({dealerSalesData:$scope.dealerSalesData})
                .$promise.then(function(dealerSalesData){
                    debugger;
                    if (dealerSalesData){
                        $modalInstance.close(dealerSalesDataList);
                        debugger;
                        $location.path("/dealerSalesDataMaintenance/"+dealerSalesData.FID);
                    } else {
                        utilSvc.addAlert("The Operation failed!", "fail", false);
                    }
                },
                function(err){
                    utilSvc.addAlert("The operation failed!", "fail", false);
                })
             }
    	 	$scope.reset=function(){
                $scope.dealerSalesData={};
                $scope.dealerSalesData.FBillNo='';
                $scope.dealerSalesData.ProductTypeName='';
                $scope.dealerSalesData.note='';
             }
             $scope.reset();
    }])
 }());
