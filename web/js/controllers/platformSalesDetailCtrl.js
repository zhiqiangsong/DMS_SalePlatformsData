/*jm - Controllers.js - zhiqiangsong 2019*/
(function() {
    'use strict';
    /* Controllers */
    angular.module('jm.controllers')
    .controller('platformSalesDetailCtrl',['$scope','$rootScope','$location','$modal','responsibleList','agentList','productTypeList','platformList','utilSvc','jmService','constants',
	function($scope,$rootScope,$location,$modal,responsibleList,agentList,productTypeList,platformList,utilSvc,apiSvc,constants){
        $scope.temp={};
        $scope.platformSalesDetail={};
        $scope.itemPerPage = constants.pageMessage.itemPerPage;
        $scope.currentPage = constants.pageMessage.currentPage;
        $scope.maxSize = constants.pageMessage.maxSize;
        $scope.productTypeList = productTypeList;
        $scope.responsibleList = responsibleList;
        $scope.agentList = agentList;
        $scope.platformList = platformList;

        $scope.platformSalesDetailList={};

         $scope.queryPlatformSalesDetail=function(){
            var dataStr;
            if($scope.platformSalesDetail.FDate != undefined && $scope.platformSalesDetail.FDate != "undefined" && $scope.platformSalesDetail.FDate != ""){
                dataStr = $scope.dateToString($scope.platformSalesDetail.FDate);
            }
            apiSvc.getPlatformSalesDetail({ProductTypeName:$scope.platformSalesDetail.ProductTypeName,FDate:dataStr,platformResponsibleName:$scope.platformSalesDetail.platformResponsibleName,agent:$scope.platformSalesDetail.agent,platform:$scope.platformSalesDetail.platform,responsibleName:$scope.platformSalesDetail.responsibleName}).$promise.then(
                function(data){
                    $scope.platformSalesDetailList = data;
                    $scope.totalItems = data.length;
                    $scope.adjustmentData();
                },
                function(err){
                    if (err.data&&err.data.message)
                        utilSvc.addAlert(err.data.message, "fail", false);
                    else
                        utilSvc.addAlert(JSON.stringify(err), "fail", false);
                }) 
         }

         $scope.adjustmentData=function(){
            $scope.platformSalesDetailListByPage=[];
            var startData = $scope.itemPerPage * ($scope.currentPage-1);
            var endData = $scope.itemPerPage * $scope.currentPage-1;
            $scope.totalItems = $scope.platformSalesDetailList.length;
            if(endData>$scope.platformSalesDetailList.length){
                endData = $scope.platformSalesDetailList.length-1
            }
            var num = 0;
            if($scope.platformSalesDetailList){
                for(var i = startData;i<=endData;i++){
                    if($scope.platformSalesDetailList[i]!=undefined){
                        $scope.platformSalesDetailListByPage[num]=$scope.platformSalesDetailList[i];
                    }
                    num++;
                }
            }
        }

         $scope.pageChanged=function(){
            $scope.platformSalesDetailListByPage=[];
            var startData = $scope.itemPerPage * ($scope.currentPage-1);
            var endData = $scope.itemPerPage * $scope.currentPage-1;
            if(endData>$scope.totalItems){
                endData = $scope.totalItems-1
            }
            var num = 0;                
            if($scope.platformSalesDetailListByPage){
                for(var i = startData;i<=endData;i++){
                    if($scope.platformSalesDetailList[i]!=undefined){
                        $scope.platformSalesDetailListByPage[num]=$scope.platformSalesDetailList[i];
                    }
                    num++;
                }
            }
        };


        $scope.return=function(){
            $location.path("/platformSalesDetail");
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
