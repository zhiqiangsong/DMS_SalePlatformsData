/*jm - directives.js - Yadong Zhu 2018*/
(function() {
    'use strict';
    /* Directives */
    angular.module('jm.directives')
    .directive('activeLink', ['$location', function(location) {
        return {
          restrict: 'A',
          link: function(scope, element, attrs, controller) {
            var clazz = attrs.activeLink;
            var path = attrs.href;
            path = path.substring(1); //hack because path does not return including hashbang
            // console.log("path="+path);
            scope.location = location;
            scope.$watch('location.path()', function(newPath) {
              if (newPath.indexOf(path)===0) {//newPath starts with path
                element.addClass(clazz);
              } else {
                element.removeClass(clazz);
              }
            });
          }
        };
    }])
    .directive('selectOnClick', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    element[0].select();
                });
                scope.$on('$destroy', function() {
                    element.off(); // deregister all event handlers
                })
            }
        };
    })
    //confirm when delete
    .directive('confirmRequired', ['$modal',
    function($modal) {
        return {
            restrict: 'A',
            priority: -1,
            link: function(scope, elem, attr) {
                var clickAction = attr.ngClick;
                var itemName = attr.confirmRequired;
                var actionOperate = attr.action || "remove";
                elem.bind('click', function(e) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    scope.itemName = itemName;
                    scope.actionOperate = actionOperate;
                    var modalInstance = $modal.open({
                        templateUrl: 'partials/confirm-modal.html',
                        scope: scope
                    });
                    scope.yes = function() {
                        modalInstance.close("yes");
                        scope.$eval(clickAction);
                    }
                });
                scope.$on('$destroy', function() {
                    elem.off(); // deregister all event handlers
                })
            }
        };
    }
])
 }());