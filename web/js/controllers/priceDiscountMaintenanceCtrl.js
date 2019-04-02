/*jm - Controllers.js - zhiqiangsong 2019*/
(function() {
    'use strict';
    /* Controllers */
    angular.module('jm.controllers')
    .controller('priceDiscountMaintenanceCtrl',['$scope','$rootScope','$location','$modal','priceDiscountList','productTypeList','platformList','utilSvc','jmService','constants',
	function($scope,$rootScope,$location,$modal,priceDiscountList,productTypeList,platformList,utilSvc,apiSvc,constants){
        $scope.temp={};
        $scope.productIndexSearch={};
        if (priceDiscountList){
            $scope.priceDiscountList = priceDiscountList;
            $scope.totalItems = priceDiscountList.length;
            $scope.itemPerPage = constants.pageMessage.itemPerPage;
            $scope.currentPage = constants.pageMessage.currentPage;
            $scope.maxSize = constants.pageMessage.maxSize;
            $scope.pageChanged=function(){
                $scope.priceDiscountListByPage=[];
                var startData = $scope.itemPerPage * ($scope.currentPage-1);
                var endData = $scope.itemPerPage * $scope.currentPage-1;
                if(endData>$scope.totalItems){
                    endData = $scope.totalItems-1
                }
                var num = 0;                
                if($scope.priceDiscountList){
                    for(var i = startData;i<=endData;i++){
                        if($scope.priceDiscountList[i]!=undefined){
                            $scope.priceDiscountListByPage[num]=$scope.priceDiscountList[i];
                        }
                        num++;
                    }
                }
            };
            $scope.pageChanged();
        } else {
            $scope.productTypeList = productTypeList;
            $scope.platformList = platformList;
            $scope.clear = function () {
            $scope.temp.dt = null;
            };
            $scope.submitForm = function() {
                var dateQuery=undefined;
                if($scope.temp.dt!=undefined){
                    dateQuery=utilSvc.formatYear($scope.temp.dt);
                }                
                $location.path("/priceDiscountMaintenance/"+dateQuery+"/"+$scope.productIndexSearch.ProductTypeName+"/"+$scope.productIndexSearch.platformName);
                $rootScope.dateQuery = dateQuery;
                $rootScope.productTypeNameQuery = $scope.productIndexSearch.ProductTypeName;
                $rootScope.platformNameQuery = $scope.productIndexSearch.platformNameQuery;
            }
            $scope.initData = function() {
                var dateQuery=undefined;
                if($scope.temp.dt!=undefined){
                    dateQuery=utilSvc.formatYear($scope.temp.dt);
                }
                apiSvc.initPriceDiscountData({year:dateQuery,ProductTypeName:$scope.productIndexSearch.ProductTypeName}).$promise.then(
                    function(){
                        utilSvc.addAlert("初始化成功！", "success", true);
                    },
                    function(err){
                        if (err.data&&err.data.message)
                            utilSvc.addAlert(err.data.message, "fail", false);
                        else
                            utilSvc.addAlert(JSON.stringify(err), "fail", false);
                    }
                ) 
            }
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
                    priceDiscountList:function(){return $scope.priceDiscountList},
                    hospitalList:function(){return hospitalList},
                    agentList:function(){return agentList},
                    productTypeList:function(){return productTypeList},
                    platformList:function(){return platformList}
                }
            });
            modalInstance.result.then(function(priceDiscountList) {
                $scope.priceDiscountList = priceDiscountList;
                $scope.adjustmentData();
            });
        };

        $scope.saveAllData=function(priceDiscountList){
            apiSvc.savePriceDiscountList({priceDiscountList:priceDiscountList}).$promise.then(
                function(data){
                    /* $scope.dealerSalesDataEntryList = data;
                    $scope.adjustmentData(); */
                    if(data.error==true){
                        utilSvc.addAlert(data.message, "fail", false);
                    } else {
                        utilSvc.addAlert("保存成功！", "success", true);
                    }
                },
                function(err){
                    if (err.data&&err.data.message)
                        utilSvc.addAlert(err.data.message, "fail", false);
                    else
                        utilSvc.addAlert(JSON.stringify(err), "fail", false);
                })
        }

        $scope.return=function(){
            $location.path("/priceDiscountMaintenance");
        }

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
            modalInstance.result.then(function(priceDiscountList) {
                $scope.priceDiscountList = priceDiscountList;
                $scope.adjustmentData();
            });
        };
        $scope.deleteBusinessPrice=function(businessPrice){
            var dateHere;
            if($rootScope.dateQuery!=undefined){               
                dateHere = utilSvc.formatDate($rootScope.dateQuery);
            }
            apiSvc.deleteBusinessPrice({businessPrice:businessPrice,date:dateHere,ProductTypeName:$rootScope.productTypeNameQuery}).$promise.then(
                function(data){
                    $scope.priceDiscountList = data;
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
            $scope.priceDiscountListByPage=[];
            var startData = $scope.itemPerPage * ($scope.currentPage-1);
            var endData = $scope.itemPerPage * $scope.currentPage-1;
            $scope.totalItems = $scope.priceDiscountList.length;
            if(endData>$scope.priceDiscountList.length){
                endData = $scope.priceDiscountList.length-1
            }
            var num = 0;
            if($scope.priceDiscountList){
                for(var i = startData;i<=endData;i++){
                    if($scope.priceDiscountList[i]!=undefined){
                        $scope.priceDiscountListByPage[num]=$scope.priceDiscountList[i];
                    }
                    num++;
                }
            }
        }

    }])
 }());
