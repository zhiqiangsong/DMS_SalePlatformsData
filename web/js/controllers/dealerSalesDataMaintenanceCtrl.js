/*jm - Controllers.js - zhiqiangsong 2019*/
(function() {
    'use strict';
    /* Controllers */
    angular.module('jm.controllers')
    .controller('dealerSalesDataMaintenanceCtrl',['$scope','$rootScope','$location','$modal','dealerSalesData','dealerSalesDataEntryList','productTypeList','utilSvc','jmService','constants',
	function($scope,$rootScope,$location,$modal,dealerSalesData,dealerSalesDataEntryList,productTypeList,utilSvc,apiSvc,constants){
        $scope.temp={};
        $scope.dealerSalesData={};


        if (dealerSalesDataEntryList && dealerSalesData){
             $scope.dealerSalesData = dealerSalesData;
             $scope.dealerSalesDataEntryList = dealerSalesDataEntryList;
             $scope.productTypeList = productTypeList;
             $scope.totalItems = dealerSalesDataEntryList.length;
             $scope.itemPerPage = constants.pageMessage.itemPerPage;
             $scope.currentPage = constants.pageMessage.currentPage;
             $scope.maxSize = constants.pageMessage.maxSize;
             var countSalesVolume = 0;
             var countSaleroom = 0;
             for(var k=0;k<dealerSalesDataEntryList.length;k++){
                countSalesVolume += dealerSalesDataEntryList[k].salesVolume;
                countSaleroom += dealerSalesDataEntryList[k].saleroom;
             }
             $scope.countSalesVolume = countSalesVolume;
             $scope.countSaleroom = countSaleroom;
             $scope.pageChanged=function(){
                 $scope.dealerSalesDataEntryListByPage=[];
                 var startData = $scope.itemPerPage * ($scope.currentPage-1);
                 var endData = $scope.itemPerPage * $scope.currentPage-1;
                 if(endData>$scope.totalItems){
                     endData = $scope.totalItems-1
                 }
                 var num = 0;                
                 if($scope.dealerSalesDataEntryListByPage){
                     for(var i = startData;i<=endData;i++){
                         if($scope.dealerSalesDataEntryList[i]!=undefined){
                             $scope.dealerSalesDataEntryListByPage[num]=$scope.dealerSalesDataEntryList[i];
                         }
                         num++;
                     }
                 }
             };
             $scope.pageChanged();
         }

        $scope.addOrEditDealerSalesData=function(dealerSalesData){
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
            modalInstance.result.then(function(dealerSalesDataEntryList) {
                $scope.dealerSalesDataEntryList = dealerSalesDataEntryList;
                $scope.adjustmentData();
            }); */
            $location.path("/dealerSalesDataMaintenance/"+dealerSalesData.FID);
        };

        $scope.commitAllData=function(dealerSalesData){
            if(dealerSalesData.status==1){
                alert("数据已经提交，无法再次提交!");                   
                return;
            }
            apiSvc.commitAllData({dealerSalesData:dealerSalesData}).$promise.then(
                function(){
                    $scope.dealerSalesData.statusZN="已提交";
                    utilSvc.addAlert("提交成功！", "success", true);
                },
                function(err){
                    if (err.data&&err.data.message)
                        utilSvc.addAlert(err.data.message, "fail", false);
                    else
                        utilSvc.addAlert(JSON.stringify(err), "fail", false);
                })
        }
        $scope.saveAllData=function(dealerSalesData,dealerSalesDataEntryList){
            if(dealerSalesData.status==1){
                alert("数据已经提交，无法保存!");                   
                return;
            }
            for(var i=0;i<dealerSalesDataEntryList.length;i++){
                if(dealerSalesDataEntryList[i].FDateEnd!="" && dealerSalesDataEntryList[i].FDateEnd!="undefined" && dealerSalesDataEntryList[i].FDateEnd!=undefined){
                    dealerSalesDataEntryList[i].FDateEnd = $scope.dateToString(dealerSalesDataEntryList[i].FDateEnd);
                }
            }
            apiSvc.saveDealerSalesData({dealerSalesData:dealerSalesData,dealerSalesDataEntryList:dealerSalesDataEntryList}).$promise.then(
                function(data){
                    /* $scope.dealerSalesDataEntryList = data;
                    $scope.adjustmentData(); */
                    utilSvc.addAlert("保存成功！", "success", true);
                },
                function(err){
                    if (err.data&&err.data.message)
                        utilSvc.addAlert(err.data.message, "fail", false);
                    else
                        utilSvc.addAlert(JSON.stringify(err), "fail", false);
                })
        }

        $scope.return=function(){
            $location.path("/dealerSalesData");
        }

        $scope.addDealerSalesData=function(){
            var modalInstance;
            modalInstance = $modal.open({
                templateUrl: 'partials/add-dealerSales-data.html',
                windowClass: "sub-detail-modal",
                controller: "addDealerSalesDataCtrl",
                backdrop: "static",
                resolve:{
                    dealerSalesDataEntryList:function(){return $scope.dealerSalesDataEntryList},
                    productTypeList:function(){return productTypeList}
                }
            });
            modalInstance.result.then(function(dealerSalesDataEntryList) {
                $scope.dealerSalesDataEntryList = dealerSalesDataEntryList;
                $scope.adjustmentData();
            });
        };

        $scope.deleteDealerSalesData=function(dealerSalesData){
            apiSvc.deleteDealerSalesData({dealerSalesData:dealerSalesData,FDate:$rootScope.FDateQuery,ProductTypeName:$rootScope.productTypeNameQuery,FBillNo:$rootScope.FBillNoQuery}).$promise.then(
                function(data){
                    /* $scope.dealerSalesDataList = data;
                    $scope.adjustmentData(); */
                    $location.path("/dealerSalesData/");
                },
                function(err){
                    if (err.data&&err.data.message)
                        utilSvc.addAlert(err.data.message, "fail", false);
                    else
                        utilSvc.addAlert(JSON.stringify(err), "fail", false);
                }) 
        };


        $scope.adjustmentData=function(){
            $scope.dealerSalesDataEntryListByPage=[];
            var startData = $scope.itemPerPage * ($scope.currentPage-1);
            var endData = $scope.itemPerPage * $scope.currentPage-1;
            $scope.totalItems = $scope.dealerSalesDataEntryList.length;
            if(endData>$scope.dealerSalesDataEntryList.length){
                endData = $scope.dealerSalesDataEntryList.length-1
            }
            var num = 0;
            if($scope.dealerSalesDataEntryList){
                for(var i = startData;i<=endData;i++){
                    if($scope.dealerSalesDataEntryList[i]!=undefined){
                        $scope.dealerSalesDataEntryListByPage[num]=$scope.dealerSalesDataEntryList[i];
                    }
                    num++;
                }
            }
        }

        $scope.dateToString = function(date){
            var dateTime;
            if(typeof date == 'string'){
                dateTime = date.substring(0,10);
            }else {
                var year = date.getFullYear(); 
                var month =(date.getMonth() + 1).toString(); 
                var day = (date.getDate()).toString();  
                if (month.length == 1) { 
                    month = "0" + month; 
                } 
                if (day.length == 1) { 
                    day = "0" + day; 
                }
                dateTime = year + "-" + month + "-" + day;
            }
            return dateTime;
        }

    }])
 }());
