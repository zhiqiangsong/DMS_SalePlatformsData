/*jm - filters.js - Yadong Zhu 2018*/
(function() {
    'use strict';
    /* Filters */
    angular.module('jm.filters')
		//take the date format "yyyyMMdd"
    .filter('ymdDate', ['$filter', function($filter) {
	    return function(dateString,format) {
	    	if (dateString)
	      		return $filter("date")(dateString+"T00:00:00",format);
	    };
		}])
		//convert UTC datetime string to local datetime string
    .filter('localDatetime', ['$filter', function($filter) {
	    return function(dateString,format) {
	    	if (dateString){
					Number.prototype.padLeft = function(base,chr){
						var  len = (String(base || 10).length - String(this).length)+1;
						return len > 0? new Array(len).join(chr || '0')+this : this;
				}
					let d = new Date(dateString),
					dformat = [d.getFullYear(),
            (d.getMonth()+1).padLeft(),
            d.getDate().padLeft(),
            ].join('-') +' ' +
           [d.getHours().padLeft(),
            d.getMinutes().padLeft(),
            d.getSeconds().padLeft()].join(':');
            return dformat;
				}
	      		return dateString;
	    };
		}])
		.filter('percentage', ['$filter', function ($filter) {
			return function (input, decimals) {
			  return $filter('number')(input * 100, decimals) + '%';
			};
		  }]);
 }());