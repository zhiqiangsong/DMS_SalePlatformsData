/*jm - services.js - Yadong Zhu 2018*/
(function() {
    'use strict';
    /* Services */
    angular.module('jm.services')
    .factory('apiValues', function() {
      return {
        pattern:'/jmapi/:type/:subtype/:param1/:param2/:param3/:param4.json',
        actions:{
          //start authentication api
            checkLoginStatus: {
              method: 'GET',
              params: {
                type: "check-login-status"
              }
            }
            ,login: { 
               method: 'POST',
               headers: {'Accept': 'application/json'},
               params: {type:"login"}
             },
              logout: { 
               method: 'GET',
               params: {type:"logout"}
             },
             getUserList:{
              method: 'GET',
              params:{
                type: 'get-user-list'
              },
              isArray:true
            },
            addEditUser:{
              method: 'POST',
              params:{
                type: 'add-edit-user'
              },
              isArray:true
            },
            addDealerSalesData:{
              method: 'POST',
              params:{
                type: 'add-dealer-sale-data'
              },
              isArray:true
            },
            getProductIndexList:{
              method: 'POST',
              params:{
                type: 'get-product-index-list'
              },
              isArray:true
            },
            getPriceDiscountList:{
              method: 'POST',
              params:{
                type: 'get-price-discount-list'
              },
              isArray:true
            },
            deleteDealerSalesData:{
              method: 'POST',
              params:{
                type: 'delete-dealer-sales-data'
              },
              isArray:true
            },
            deleteResponsibleMaintenance:{
              method: 'POST',
              params:{
                type: 'delete-responsible-maintenance'
              },
              isArray:true
            },
            deleteUser:{
              method: 'POST',
              params:{
                type: 'delete-user'
              },
              isArray:true
            },
            viewErrorLog:{
              method: 'POST',
              params:{
                type: 'view-error-log'
              },
              isArray:true
            },
            getDealerSalesDataList:{
              method: 'POST',
              params:{
                type: 'get-dealer-sales-data-list'
              },
              isArray:true
            },
            getProductType:{
              method: 'GET',
              params:{
                type: 'get-product-type-list'
              },
              isArray:true
            },
            viewInfoLog:{
              method: 'POST',
              params:{
                type: 'view-info-log'
              },
              isArray:true
            },
             getPerformanceReport:{
              method: 'POST',
              params: {
                type: "get-performance-report"
              }
            },
            getDealerSalesData:{
             method: 'POST',
             params: {
               type: "get-dealerSalesData"
             }
           },
           getDealerSalesDataEntryList:{
            method: 'POST',
            params: {
              type: "get-dealerSalesDataEntry-list"
            },
            isArray:true
          },
          getPlatformSalesDetail:{
            method: 'POST',
            params: {
              type: "get-platform-sales-detail"
            },
            isArray:true
          },
          getResponsibleMaintenanceList:{
            method: 'POST',
            params: {
              type: "get-responsibleMaintenance-list"
            },
            isArray:true
          },
          initProductIndexData:{
            method: 'POST',
            params: {
              type: "init-product-index-data"
            }
          },
          initPriceDiscountData:{
            method: 'POST',
            params: {
              type: "init-price-discount-data"
            }
          },
          saveDealerSalesData:{
            method: 'POST',
            params:{
              type: 'save-dealer-sales-data'
            }
          },
          saveProductIndexList:{
            method: 'POST',
            params:{
              type: 'save-product-index-list'
            }
          },
          savePriceDiscountList:{
            method: 'POST',
            params:{
              type: 'save-price-discount-list'
            }
          },
          getAgent:{
            method: 'GET',
            params:{
              type: 'get-agent-list'
            },
            isArray:true
          },
          getPlatformList:{
            method: 'GET',
            params:{
              type: 'get-platform-list'
            },
            isArray:true
          },
          getResponsibleList:{
            method: 'GET',
            params:{
              type: 'get-responsible-list'
            },
            isArray:true
          },
          addEditResponsibleMaintenance:{
            method: 'POST',
            params:{
              type: 'add-edit-responsible-maintenance'
            },
            isArray:true
          },
          commitAllData:{
            method: 'POST',
            params:{
              type: 'commit-dealer-sales-data'
            }
          }
        }
      }
       
    })
    .factory('jmService', ['$resource','apiValues','constants',
      function($resource,apiValues,constants) {
        return $resource
          (
            apiValues.pattern,
            {},
            apiValues.actions
          );
    }])
    .service('utilSvc',['$timeout','$rootScope',function($timeout,$rootScope){
        return {
          isServerRequest:function(url){
                var re = new RegExp('/jmapi');//start with '/jmapi'
                var match=re.exec(url);
                if (match===null) return false;
                else return true;
            },
          addAlert: function(text, type, isAutoClosed, callback) {
            $rootScope.pageParts = {};
            $rootScope.pageParts.alerts = [];
            $rootScope.addAlert = function(type, text) {
              return $rootScope.pageParts.alerts.push({
                type: type,
                msg: text
              });
            };
            $rootScope.closeAlert = function(index) {
              $rootScope.pageParts.alerts.splice(index, 1);
            };
            var alert;
            if (type === 'success') {
              alert = $rootScope.addAlert('success', text);
            } else  if (type === 'warning'){
              $rootScope.addAlert('warning', text);
            }else {
              $rootScope.addAlert('danger', text);
            }
            if (isAutoClosed) {
              $timeout(function() {
                $rootScope.closeAlert($rootScope.pageParts.alerts.indexOf(alert));
                if (callback) {
                  callback.call();
                  return
                }
              }, 5000);
            } else {
              if (callback)
                callback.call();
              return;
            }
          }
          ,
          findItemById: function(id, itemList,idName) {
            if (angular.isDefined(id)) {
              for (var i = 0; i < itemList.length; i++) {
                if (itemList[i][idName] === id) {
                  return itemList[i];
                }
              }
            }
          },
          findItemIndexById: function(id, itemList, idName) {
            if (angular.isDefined(id)) {
              for (var i = 0; i < itemList.length; i++) {
                if (itemList[i][idName] === id) {
                    return i;
                  }
              }
              return -1;
            }
          },
          removeItemById: function(id, itemList,idName) {
              if (angular.isDefined(id)) {
                for (var i = 0; i < itemList.length; i++) {
                  if (itemList[i][idName] === id) {
                    itemList.splice(i, 1);
                    return true;
                  }
                }
                return false;
              }
              return false;
            },
            formatDate:function(date,separator) {
              var d = (date)?new Date(date):new Date(),
                  month = '' + (d.getMonth() + 1),
                  day = '' + d.getDate(),
                  year = d.getFullYear();
          
              if (month.length < 2) month = '0' + month;
              if (day.length < 2) day = '0' + day;
          
              return [year, month, day].join(separator||"");
          },
          formatYear:function(date,separator) {
            var d = (date)?new Date(date):new Date(),
                year = d.getFullYear();
        
        
            return year;
        },
          pageLoading:function(arg){
            if (arg==="start"&&$rootScope.pageLoading){ //prevent from submit twice before return
              throw new Error("Please don't submit twice!");
            }
            if (arg==="start"){
              $rootScope.pageLoading=true;
            } else {
              $rootScope.pageLoading=false;
            }
          }
        }
    }])
    .value('constants', {
      categories:[
        {
          id:"SGW",
          display:"BIT"
        },
        {
          id:"CHW",
          display:"BESA"
        },
        {
          id:"SGQ",
          display:"QA Sample"
        }
      ],
      pageMessage:
        {
          itemPerPage:10,
          currentPage:1,
          maxSize:8
        },
      userRoles:["superAdmin","admin","normal"],
      units:[
        {id:"IN",display:"inch"},
        {id:"BOT",display:"BT"},
        {id:"KAR",display:"CAR"},
        {id:"GLL",display:"GAL"},
        {id:"STD",display:"HR"},
        {id:"PAK",display:"PAC"},
        {id:"ST",display:"PC"}
      ]
    })
    .service('dynamicLocale',function(){
            var locale = {
                "en-sg":{
                    "DATETIME_FORMATS": {
                      "AMPMS": [
                        "AM",
                        "PM"
                      ],
                      "DAY": [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                      ],
                      "ERANAMES": [
                        "Before Christ",
                        "Anno Domini"
                      ],
                      "ERAS": [
                        "BC",
                        "AD"
                      ],
                      "FIRSTDAYOFWEEK": 6,
                      "MONTH": [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                      ],
                      "SHORTDAY": [
                        "Sun",
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat"
                      ],
                      "SHORTMONTH": [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec"
                      ],
                      "STANDALONEMONTH": [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                      ],
                      "WEEKENDRANGE": [
                        5,
                        6
                      ],
                      "fullDate": "EEEE, d MMMM y",
                      "longDate": "d MMMM y",
                      "medium": "d MMM y h:mm:ss a",
                      "mediumDate": "d MMM y",
                      "mediumTime": "h:mm:ss a",
                      "short": "d/M/yy h:mm a",
                      "shortDate": "d/M/yy",
                      "shortTime": "h:mm a"
                    },
                    "NUMBER_FORMATS": {
                      "CURRENCY_SYM": "$",
                      "DECIMAL_SEP": ".",
                      "GROUP_SEP": ",",
                      "PATTERNS": [
                        {
                          "gSize": 3,
                          "lgSize": 3,
                          "maxFrac": 3,
                          "minFrac": 0,
                          "minInt": 1,
                          "negPre": "-",
                          "negSuf": "",
                          "posPre": "",
                          "posSuf": ""
                        },
                        {
                          "gSize": 3,
                          "lgSize": 3,
                          "maxFrac": 2,
                          "minFrac": 2,
                          "minInt": 1,
                          "negPre": "-\u00a4",
                          "negSuf": "",
                          "posPre": "\u00a4",
                          "posSuf": ""
                        }
                      ]
                    },
                    "id": "en-sg",
                    "localeID": "en_SG",
                },
                "zh-cn":{
                    "DATETIME_FORMATS": {
                        "AMPMS": [
                          "\u4e0a\u5348",
                          "\u4e0b\u5348"
                        ],
                        "DAY": [
                          "\u661f\u671f\u65e5",
                          "\u661f\u671f\u4e00",
                          "\u661f\u671f\u4e8c",
                          "\u661f\u671f\u4e09",
                          "\u661f\u671f\u56db",
                          "\u661f\u671f\u4e94",
                          "\u661f\u671f\u516d"
                        ],
                        "MONTH": [
                          "\u4e00\u6708",
                          "\u4e8c\u6708",
                          "\u4e09\u6708",
                          "\u56db\u6708",
                          "\u4e94\u6708",
                          "\u516d\u6708",
                          "\u4e03\u6708",
                          "\u516b\u6708",
                          "\u4e5d\u6708",
                          "\u5341\u6708",
                          "\u5341\u4e00\u6708",
                          "\u5341\u4e8c\u6708"
                        ],
                        "SHORTDAY": [
                          "\u5468\u65e5",
                          "\u5468\u4e00",
                          "\u5468\u4e8c",
                          "\u5468\u4e09",
                          "\u5468\u56db",
                          "\u5468\u4e94",
                          "\u5468\u516d"
                        ],
                        "SHORTMONTH": [
                          "1\u6708",
                          "2\u6708",
                          "3\u6708",
                          "4\u6708",
                          "5\u6708",
                          "6\u6708",
                          "7\u6708",
                          "8\u6708",
                          "9\u6708",
                          "10\u6708",
                          "11\u6708",
                          "12\u6708"
                        ],
                        "fullDate": "y\u5e74M\u6708d\u65e5EEEE",
                        "longDate": "y\u5e74M\u6708d\u65e5",
                        "medium": "yyyy-M-d a h:mm:ss",
                        "mediumDate": "yyyy-M-d",
                        "mediumTime": "a h:mm:ss",
                        "short": "yy-M-d a h:mm",
                        "shortDate": "yy-M-d",
                        "shortTime": "ah:mm"
                  },
                  "NUMBER_FORMATS": {
                    "CURRENCY_SYM": "\u00a5",
                    "DECIMAL_SEP": ".",
                    "GROUP_SEP": ",",
                    "PATTERNS": [
                      {
                        "gSize": 3,
                        "lgSize": 3,
                        "macFrac": 0,
                        "maxFrac": 3,
                        "minFrac": 0,
                        "minInt": 1,
                        "negPre": "-",
                        "negSuf": "",
                        "posPre": "",
                        "posSuf": ""
                      },
                      {
                        "gSize": 3,
                        "lgSize": 3,
                        "macFrac": 0,
                        "maxFrac": 2,
                        "minFrac": 2,
                        "minInt": 1,
                        "negPre": "(\u00a4",
                        "negSuf": ")",
                        "posPre": "\u00a4",
                        "posSuf": ""
                      }
                    ]
                  },
                  "id": "zh-cn"
                }
            }; //end of var locale
            
        return {
          setLocale:function($locale){
              $locale.DATETIME_FORMATS = locale[$locale.id].DATETIME_FORMATS;
              $locale.NUMBER_FORMATS = locale[$locale.id].NUMBER_FORMATS;
          }
        }
    });
 }());