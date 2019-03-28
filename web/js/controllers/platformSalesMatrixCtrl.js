/*jm - Controllers.js - zhiqiangsong 2019*/
(function() {
    'use strict';
    /* Controllers */
    angular.module('jm.controllers')
    .controller('platformSalesMatrixCtrl',['$scope','$rootScope','$location','$modal','responsibleList','agentList','productTypeList','platformList','utilSvc','jmService','constants',
	function($scope,$rootScope,$location,$modal,responsibleList,agentList,productTypeList,platformList,utilSvc,apiSvc,constants){
        $scope.temp={};
        $scope.PlatformSalesMatrixl={};
        $scope.itemPerPage = constants.pageMessage.itemPerPage;
        $scope.currentPage = constants.pageMessage.currentPage;
        $scope.maxSize = constants.pageMessage.maxSize;
        $scope.productTypeList = productTypeList;
        $scope.responsibleList = responsibleList;
        $scope.agentList = agentList;
        $scope.platformList = platformList;

        $scope.PlatformSalesMatrixlList={};

        // $scope.PlatformSalesMatrixl.FDateTmp="";
        // if($scope.PlatformSalesMatrixl.FDate != undefined && $scope.PlatformSalesMatrixl.FDate != "undefined" && $scope.PlatformSalesMatrixl.FDate != ""){
        //     $scope.PlatformSalesMatrixl.FDateTmp = $scope.dateToString($scope.PlatformSalesMatrixl.FDate);
        // };


        // //for excel export url
        // $scope.temp.dt= $rootScope.dateQuery ;
        // $scope.saleForecastSearch.ProductTypeName=$rootScope.productTypeNameQuery ;
        // $scope.saleForecastSearch.FHospName=$rootScope.fHospNameQuery ;

         $scope.queryPlatformSalesDetail=function(){
            var dataStr;
            if($scope.PlatformSalesMatrixl.FDate != undefined && $scope.PlatformSalesMatrixl.FDate != "undefined" && $scope.PlatformSalesMatrixl.FDate != ""){
                dataStr = $scope.dateToString($scope.PlatformSalesMatrixl.FDate);
            }
            apiSvc.getPlatformSalesMatrix({ProductTypeName:$scope.PlatformSalesMatrixl.ProductTypeName,FDate:dataStr,platformResponsibleName:$scope.PlatformSalesMatrixl.platformResponsibleName,agent:$scope.PlatformSalesMatrixl.agent,platform:$scope.PlatformSalesMatrixl.platform,responsibleName:$scope.PlatformSalesMatrixl.responsibleName}).$promise.then(
                function(data){
                    $scope.PlatformSalesMatrixlList = data;
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
            $scope.PlatformSalesMatrixlListByPage=[];
            var startData = $scope.itemPerPage * ($scope.currentPage-1);
            var endData = $scope.itemPerPage * $scope.currentPage-1;
            $scope.totalItems = $scope.PlatformSalesMatrixlList.length;
            if(endData>$scope.PlatformSalesMatrixlList.length){
                endData = $scope.PlatformSalesMatrixlList.length-1
            }
            var num = 0;
            if($scope.PlatformSalesMatrixlList){
                for(var i = startData;i<=endData;i++){
                    if($scope.PlatformSalesMatrixlList[i]!=undefined){
                        $scope.PlatformSalesMatrixlListByPage[num]=$scope.PlatformSalesMatrixlList[i];
                    }
                    num++;
                }
            }
        }

         $scope.pageChanged=function(){
            $scope.PlatformSalesMatrixlListByPage=[];
            var startData = $scope.itemPerPage * ($scope.currentPage-1);
            var endData = $scope.itemPerPage * $scope.currentPage-1;
            if(endData>$scope.totalItems){
                endData = $scope.totalItems-1
            }
            var num = 0;                
            if($scope.PlatformSalesMatrixlListByPage){
                for(var i = startData;i<=endData;i++){
                    if($scope.PlatformSalesMatrixlList[i]!=undefined){
                        $scope.PlatformSalesMatrixlListByPage[num]=$scope.PlatformSalesMatrixlList[i];
                    }
                    num++;
                }
            }
        };


        $scope.return=function(){
            $location.path("/PlatformSalesMatrixl");
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
