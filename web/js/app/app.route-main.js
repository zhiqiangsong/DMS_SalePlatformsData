/*jm - App.js - Yadong Zhu 2018*/
(function() {
    'use strict';
    
    angular.module('jm')                
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
            .when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'homeCtrl'
            })
            .when('/report/:date?', {
                templateUrl: 'partials/performance-report.html',
                controller: 'performanceReportCtrl',
                resolve:{
                    report:['$q','$route','utilSvc','jmService',
                        function($q,$route,util,apiSvc){
                            var deferred = $q.defer();
                            if ($route.current.params.date){
                                util.pageLoading("start");
                            apiSvc.getPerformanceReport({date:$route.current.params.date}).$promise.then(function(data){
                                if (data){
                                    deferred.resolve(data);
                                } else {
                                    deferred.resolve(undefined);
                                }
                                util.pageLoading("stop");
                            },function(err){
                                deferred.reject(err);
                                util.pageLoading("stop");
                            })
                        } else {
                            deferred.resolve(undefined)
                            util.pageLoading("stop");
                        }
                            return deferred.promise;
                        }]
                }
            })
            .when('/dealerSalesData', {
                templateUrl: 'partials/dealerSalesData-report.html',
                controller: 'dealerSalesDataCtrl',
                resolve:{
                    productTypeList:['$q','$route','jmService','utilSvc',
                            function($q,$route,apiSvc,util){
                                var deferred = $q.defer();
                                apiSvc.getProductType().$promise.then(function(data){
                                    if (data){
                                        deferred.resolve(data);
                                    } else {
                                        deferred.resolve(undefined);
                                    }
                                },function(err){
                                    deferred.reject(err);
                                })
                                return deferred.promise;
                            }],
                    dealerSalesDataList:['$q','$route','jmService','utilSvc',
                        function($q,$route,apiSvc,util){
                            var deferred = $q.defer();
                            util.pageLoading("start");
                            if (true){
                                apiSvc.getDealerSalesDataList().$promise.then(function(data){
                                    if (data){
                                        deferred.resolve(data);
                                    } else {
                                        deferred.resolve(undefined);
                                    }
                                    util.pageLoading("stop");
                                },function(err){
                                    deferred.reject(err);
                                    util.pageLoading("stop");
                                })
                            }else {
                                deferred.resolve(undefined)
                                util.pageLoading("stop");
                            }
                            
                            return deferred.promise;
                        }]
                }
            })
            .when('/dealerSalesDataMaintenance/:FID?', {
                templateUrl: 'partials/dealerSalesDataMaintenance.html',
                controller: 'dealerSalesDataMaintenanceCtrl',
                resolve:{
                    productTypeList:['$q','$route','jmService','utilSvc',
                            function($q,$route,apiSvc,util){
                                var deferred = $q.defer();
                                apiSvc.getProductType().$promise.then(function(data){
                                    if (data){
                                        deferred.resolve(data);
                                    } else {
                                        deferred.resolve(undefined);
                                    }
                                },function(err){
                                    deferred.reject(err);
                                })
                                return deferred.promise;
                            }],
                        dealerSalesData:['$q','$route','jmService','utilSvc',
                        function($q,$route,apiSvc,util){
                            var deferred = $q.defer();
                            if ($route.current.params.FID){
                                apiSvc.getDealerSalesData({FID:$route.current.params.FID}).$promise.then(function(data){
                                    if (data){
                                        deferred.resolve(data);
                                    } else {
                                        deferred.resolve(undefined);
                                    }
                                },function(err){
                                    deferred.reject(err);
                                })
                            }else {
                                deferred.resolve(undefined)
                            }
                            
                            return deferred.promise;
                        }],
                        dealerSalesDataEntryList:['$q','$route','jmService','utilSvc',
                        function($q,$route,apiSvc,util){
                            var deferred = $q.defer();
                            util.pageLoading("start");
                            if ($route.current.params.FID){
                                apiSvc.getDealerSalesDataEntryList({FID:$route.current.params.FID}).$promise.then(function(data){
                                    if (data){
                                        deferred.resolve(data);
                                    } else {
                                        deferred.resolve(undefined);
                                    }
                                    util.pageLoading("stop");
                                },function(err){
                                    deferred.reject(err);
                                    util.pageLoading("stop");
                                })
                            }else {
                                deferred.resolve(undefined)
                                util.pageLoading("stop");
                            }
                            
                            return deferred.promise;
                        }]
                }
            })
            .when('/admin', {
                templateUrl: 'partials/admin.html',
                controller: 'adminCtrl',
                resolve:{
                    userList:['$q','jmService','utilSvc',
                        function($q,apiSvc,util){
                            var deferred = $q.defer();
                            util.pageLoading("start");
                            apiSvc.getUserList().$promise.then(function(data){
                                if (data){
                                    deferred.resolve(data);
                                } else {
                                    deferred.resolve(undefined);
                                }
                                util.pageLoading("stop");
                            },function(err){
                                deferred.reject(err);
                                util.pageLoading("stop");
                            })
                            return deferred.promise;
                        }]
                }
            })
            .when('/view-error-log', {
                templateUrl: 'partials/view-log.html',
                controller: 'viewLogCtrl',
                resolve:{
                    logs:['$q','jmService','utilSvc',
                    function($q,apiSvc,util){
                            var deferred = $q.defer();
                            util.pageLoading("start");
                            apiSvc.viewErrorLog({type:"error-log"}).$promise.then(function(data){
                                if (data){
                                    deferred.resolve(data);
                                } else {
                                    deferred.resolve(undefined);
                                }
                                util.pageLoading("stop");
                            },function(err){
                                deferred.reject(err);
                                util.pageLoading("stop");
                            })
                            return deferred.promise;
                        }]
                }
            })
            .when('/view-info-log', {
                templateUrl: 'partials/view-log.html',
                controller: 'viewLogCtrl',
                resolve:{
                    logs:['$q','jmService','utilSvc',
                    function($q,apiSvc,util){
                            var deferred = $q.defer();
                            util.pageLoading("start");
                            apiSvc.viewInfoLog({type:"info-log"}).$promise.then(function(data){
                                if (data){
                                    deferred.resolve(data);
                                } else {
                                    deferred.resolve(undefined);
                                }
                                util.pageLoading("stop");
                            },function(err){
                                deferred.reject(err);
                                util.pageLoading("stop");
                            })
                            return deferred.promise;
                        }]
                }
            })
            .otherwise({
                redirectTo: '/home'
            })
        }
    ])
}());

