'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','ui'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/storeMapper', {templateUrl: 'partials/storeMapper', controller: StoreMapperCtrl});
        $routeProvider.otherwise({redirectTo: '/storeMapper'});
        $locationProvider.html5Mode(true);
    }]);
