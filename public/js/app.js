'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/storeMapper', {templateUrl: 'partials/storeMapper', controller: StoreMapperCtrl});
        $routeProvider.when('/mallDirectory', {templateUrl: 'partials/mallDirectory', controller: StoreMapperCtrl});
        $routeProvider.otherwise({redirectTo: '/mallDirectory'});
        $locationProvider.html5Mode(true);
    }]);
