'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives'])

//routes
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1', controller: MyCtrl1});
    $routeProvider.otherwise({redirectTo: '/view1'});
    $locationProvider.html5Mode(true);
}]);

//factory method that returns a google map
//instance that we use for drawing
myApp.factory('maps', function(){
    //local vars
    var map;
    var geocoder;
    var drawingManager;

    //function to initialize the map
    function initialize(){
        geocoder =  new google.maps.Geocoder();
        var mapOptions = {
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);

        drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                    google.maps.drawing.OverlayType.POLYGON
                ]
            },
            polygonOptions: {
                fillColor: '#ffff00',
                fillOpacity: 0.5,
                strokeWeight: 1,
                clickable: true,
                zIndex: 1,
                editable: true
            }
        });
        drawingManager.setMap(map);
    }

    initialize();

    return {
        //sets the map location to address specified
        setMapLocation:function(address){
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        },
        //add handler to polygoncomplete
        setPolygonCompleteHandler:function(handler){
            google.maps.event.addListener(drawingManager, 'polygoncomplete', handler);
        },
        //show the polygon
        showPolygon:function(polygon){
            polygon.setMap(map);
        },
        //hide the polygon
        hidePolygon:function(polygon){
            polygon.setMap(null);
        }
    };
});