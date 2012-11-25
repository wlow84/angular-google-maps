'use strict';

/* Directives */
angular.module('myApp.directives', [])
    .directive('mtFocus', function($parse) {
        return function(scope, element, attrs) {

            var fn = $parse(attrs['mtFocus']);

            element.bind('focus', function(event){
                scope.$apply(function() {
                    fn(scope, {$event:event});
                });
            });
        }
    })
    .directive('mtMaps',function(maps){
        return function(scope, element, attrs) {
            var map = new google.maps.Map(element, opts);

            //Set scope variable for the map
            model.assign(scope, maps);
        };
    });
