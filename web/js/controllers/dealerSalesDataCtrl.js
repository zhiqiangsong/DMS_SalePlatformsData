/*jm - Controllers.js - zhiqiangsong 2019*/
(function() {
    'use strict';
    /* Controllers */
    angular.module('jm.controllers')
    .controller('dealerSalesDataCtrl',['$scope','$rootScope','$location','$modal','dealerSalesDataList','productTypeList','utilSvc','jmService','constants',
	function($scope,$rootScope,$location,$modal,dealerSalesDataList,productTypeList,utilSvc,apiSvc,constants){
        $scope.temp={};
        $scope.dealerSalesDataSearch={};

        if (dealerSalesDataList){
            // debugger;
             $scope.dealerSalesDataList = dealerSalesDataList;
             $scope.productTypeList = productTypeList;
             $scope.totalItems = dealerSalesDataList.length;
             $scope.itemPerPage = constants.pageMessage.itemPerPage;
             $scope.currentPage = constants.pageMessage.currentPage;
             $scope.maxSize = constants.pageMessage.maxSize;
             $scope.pageChanged=function(){
                 $scope.dealerSalesDataListByPage=[];
                 var startData = $scope.itemPerPage * ($scope.currentPage-1);
                 var endData = $scope.itemPerPage * $scope.currentPage-1;
                 if(endData>$scope.totalItems){
                     endData = $scope.totalItems-1
                 }
                 var num = 0;                
                 if($scope.dealerSalesDataListByPage){
                     for(var i = startData;i<=endData;i++){
                         if($scope.dealerSalesDataList[i]!=undefined){
                             $scope.dealerSalesDataListByPage[num]=$scope.dealerSalesDataList[i];
                         }
                         num++;
                     }
                 }
             };
             $scope.pageChanged();
         }

        $scope.addOrEditBusinessPrice=function(businessPrice){
            var modalInstance;
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
            modalInstance.result.then(function(businessPriceList) {
                $scope.businessPriceList = businessPriceList;
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
        $scope.deleteBusinessPrice=function(businessPrice){
            var dateHere;
            if($rootScope.dateQuery!=undefined){               
                dateHere = utilSvc.formatDate($rootScope.dateQuery);
            }
            apiSvc.deleteBusinessPrice({businessPrice:businessPrice,date:dateHere,ProductTypeName:$rootScope.productTypeNameQuery,FHospName:$rootScope.fHospNameQuery}).$promise.then(
                function(data){
                    $scope.businessPriceList = data;
                    $scope.adjustmentData();
                },
                function(err){
                    if (err.data&&err.data.message)
                        utilSvc.addAlert(err.data.message, "fail", false);
                    else
                        utilSvc.addAlert(JSON.stringify(err), "fail", false);
                }) 
        };

        $scope.queryDealerSalesData=function(){
            //$scope.temp.dt.setHours($scope.temp.dt.getHours()+8);
            apiSvc.getDealerSalesDataList({FBillNo:$scope.dealerSalesDataSearch.FBillNo,FDate:$scope.temp.dt,ProductTypeName:$scope.dealerSalesDataSearch.ProductTypeName}).$promise.then(
                function(data){
                    $scope.dealerSalesDataList = data;
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
            $scope.dealerSalesDataListByPage=[];
            var startData = $scope.itemPerPage * ($scope.currentPage-1);
            var endData = $scope.itemPerPage * $scope.currentPage-1;
            $scope.totalItems = $scope.dealerSalesDataList.length;
            if(endData>$scope.dealerSalesDataList.length){
                endData = $scope.dealerSalesDataList.length-1
            }
            var num = 0;
            if($scope.dealerSalesDataList){
                for(var i = startData;i<=endData;i++){
                    if($scope.dealerSalesDataList[i]!=undefined){
                        $scope.dealerSalesDataListByPage[num]=$scope.dealerSalesDataList[i];
                    }
                    num++;
                }
            }
        }

    }])
 }());
