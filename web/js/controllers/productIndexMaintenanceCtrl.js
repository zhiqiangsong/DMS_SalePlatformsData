/*jm - Controllers.js - zhiqiangsong 2019*/
(function() {
    'use strict';
    /* Controllers */
    angular.module('jm.controllers')
    .controller('productIndexMaintenanceCtrl',['$scope','$rootScope','$location','$modal','productIndexList','productTypeList','platformList','utilSvc','jmService','constants',
	function($scope,$rootScope,$location,$modal,productIndexList,productTypeList,platformList,utilSvc,apiSvc,constants){
        $scope.temp={};
        $scope.productIndexSearch={};
        if (productIndexList){
            $scope.productIndexList = productIndexList;
            $scope.totalItems = productIndexList.length;
            $scope.itemPerPage = constants.pageMessage.itemPerPage;
            $scope.currentPage = constants.pageMessage.currentPage;
            $scope.maxSize = constants.pageMessage.maxSize;
            $scope.pageChanged=function(){
                $scope.productIndexListByPage=[];
                var startData = $scope.itemPerPage * ($scope.currentPage-1);
                var endData = $scope.itemPerPage * $scope.currentPage-1;
                if(endData>$scope.totalItems){
                    endData = $scope.totalItems-1
                }
                var num = 0;                
                if($scope.productIndexList){
                    for(var i = startData;i<=endData;i++){
                        if($scope.productIndexList[i]!=undefined){
                            $scope.productIndexListByPage[num]=$scope.productIndexList[i];
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
                $location.path("/productIndexMaintenance/"+dateQuery+"/"+$scope.productIndexSearch.ProductTypeName+"/"+$scope.productIndexSearch.platformName);
                $rootScope.dateQuery = dateQuery;
                $rootScope.productTypeNameQuery = $scope.productIndexSearch.ProductTypeName;
                $rootScope.platformNameQuery = $scope.productIndexSearch.platformNameQuery;
            }
            $scope.initData = function() {
                var dateQuery=undefined;
                if($scope.temp.dt!=undefined){
                    dateQuery=utilSvc.formatYear($scope.temp.dt);
                }
                apiSvc.initProductIndexData({year:dateQuery,ProductTypeName:$scope.productIndexSearch.ProductTypeName}).$promise.then(
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
                    productIndexList:function(){return $scope.productIndexList},
                    hospitalList:function(){return hospitalList},
                    agentList:function(){return agentList},
                    productTypeList:function(){return productTypeList},
                    platformList:function(){return platformList}
                }
            });
            modalInstance.result.then(function(productIndexList) {
                $scope.productIndexList = productIndexList;
                $scope.adjustmentData();
            });
        };

        $scope.saveAllData=function(productIndexList){
            apiSvc.saveProductIndexList({productIndexList:productIndexList}).$promise.then(
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
            $location.path("/productIndexMaintenance");
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
            modalInstance.result.then(function(productIndexList) {
                $scope.productIndexList = productIndexList;
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
                    $scope.productIndexList = data;
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
            $scope.productIndexListByPage=[];
            var startData = $scope.itemPerPage * ($scope.currentPage-1);
            var endData = $scope.itemPerPage * $scope.currentPage-1;
            $scope.totalItems = $scope.productIndexList.length;
            if(endData>$scope.productIndexList.length){
                endData = $scope.productIndexList.length-1
            }
            var num = 0;
            if($scope.productIndexList){
                for(var i = startData;i<=endData;i++){
                    if($scope.productIndexList[i]!=undefined){
                        $scope.productIndexListByPage[num]=$scope.productIndexList[i];
                    }
                    num++;
                }
            }
        }

    }])
 }());
