'use strict';

/* Directives */
angular.module('myApp.directives', []).
    directive('mtFocus', function($parse) {
        return function(scope, element, attrs) {

            var fn = $parse(attrs['mtFocus']);

            element.bind('focus', function(event){
                scope.$apply(function() {
                    fn(scope, {$event:event});
                });
            });
        }
    });
