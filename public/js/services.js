'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
    .factory('maps', function(){
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
    }).
    value('version', '0.1');
