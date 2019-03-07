/*jm - App.js - Yadong Zhu 2018*/
(function(angular) {
    'use strict';
    angular.module('jm.services', ['ngResource']);
    angular.module('jm.filters', []);
    angular.module('jm.directives', []);
    angular.module('jm.controllers', []);      
    angular.module('jm', [
        'ngRoute',
        'ngResource',
        'ngAnimate',
        'ngSanitize',
        'jm.controllers',
        'jm.services',
        'jm.filters',
        'LocalStorageModule',
        'jm.directives',
        'ui.bootstrap',
        'ui.toggle'
    ]);
}(window.angular));

