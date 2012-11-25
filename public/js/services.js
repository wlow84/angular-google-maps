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
        var colors = ["#F7F8E0","#F1F8E0","#ECF8E0","#E6F8E0","#E0F8E0","#E0F8E6","#E0F8EC","#E0F8F1","#E0F8F7","#E0F2F7","#E0ECF8","#E0E6F8","#E0E0F8","#E6E0F8","#ECE0F8","#F2E0F7","#F8E0F7","#F8E0F1","#F8E0EC","#F8E0E6","#FAFAFA","#F6CECE","#F6D8CE","#F6E3CE","#F5ECCE","#F5F6CE","#ECF6CE","#E3F6CE","#D8F6CE","#CEF6CE","#CEF6D8","#CEF6E3","#CEF6EC","#CEF6F5","#CEECF5","#CEE3F6","#CED8F6","#CECEF6","#D8CEF6","#E3CEF6","#ECCEF5","#F6CEF5","#F6CEEC","#F6CEE3","#F6CED8","#F2F2F2","#F5A9A9","#F5BCA9","#F5D0A9","#F3E2A9","#F2F5A9","#E1F5A9","#D0F5A9","#BCF5A9","#A9F5A9","#A9F5BC","#A9F5D0","#A9F5E1","#A9F5F2","#A9E2F3","#A9D0F5","#A9BCF5","#A9A9F5","#BCA9F5","#D0A9F5","#E2A9F3","#F5A9F2","#F5A9E1","#F5A9D0","#F5A9BC","#E6E6E6","#F78181","#F79F81","#F7BE81","#F5DA81","#F3F781","#D8F781","#BEF781","#9FF781","#81F781","#81F79F","#81F7BE","#81F7D8","#81F7F3","#81DAF5","#81BEF7","#819FF7","#8181F7","#9F81F7","#BE81F7","#DA81F5","#F781F3","#F781D8","#F781BE","#F7819F","#D8D8D8","#FA5858","#FA8258","#FAAC58","#F7D358","#F4FA58","#D0FA58","#ACFA58","#82FA58","#58FA58","#58FA82","#58FAAC","#58FAD0","#58FAF4","#58D3F7","#58ACFA","#5882FA","#5858FA","#8258FA","#AC58FA","#D358F7","#FA58F4","#FA58D0","#FA58AC","#FA5882","#BDBDBD","#FE2E2E","#FE642E","#FE9A2E","#FACC2E","#F7FE2E","#C8FE2E","#9AFE2E","#64FE2E","#2EFE2E","#2EFE64","#2EFE9A","#2EFEC8","#2EFEF7","#2ECCFA","#2E9AFE","#2E64FE","#2E2EFE","#642EFE","#9A2EFE","#CC2EFA","#FE2EF7","#FE2EC8","#FE2E9A","#FE2E64","#A4A4A4","#FF0000","#FF4000","#FF8000","#FFBF00","#FFFF00","#BFFF00","#80FF00","#40FF00","#00FF00","#00FF40","#00FF80","#00FFBF","#00FFFF","#00BFFF","#0080FF","#0040FF","#0000FF","#4000FF","#8000FF","#BF00FF","#FF00FF","#FF00BF","#FF0080","#FF0040","#848484","#DF0101","#DF3A01","#DF7401","#DBA901","#D7DF01","#A5DF00","#74DF00","#3ADF00","#01DF01","#01DF3A","#01DF74","#01DFA5","#01DFD7","#01A9DB","#0174DF","#013ADF","#0101DF","#3A01DF","#7401DF","#A901DB","#DF01D7","#DF01A5","#DF0174","#DF013A","#6E6E6E","#B40404","#B43104","#B45F04","#B18904","#AEB404","#86B404","#5FB404","#31B404","#04B404","#04B431","#04B45F","#04B486","#04B4AE","#0489B1","#045FB4","#0431B4","#0404B4","#3104B4","#5F04B4","#8904B1","#B404AE","#B40486","#B4045F","#B40431","#585858","#8A0808","#8A2908","#8A4B08","#886A08","#868A08","#688A08","#4B8A08","#298A08","#088A08","#088A29","#088A4B","#088A68","#088A85","#086A87","#084B8A","#08298A","#08088A","#29088A","#4B088A","#6A0888","#8A0886","#8A0868","#8A084B","#8A0829","#424242","#610B0B","#61210B","#61380B","#5F4C0B","#5E610B","#4B610B","#38610B","#21610B","#0B610B","#0B6121","#0B6138","#0B614B","#0B615E","#0B4C5F","#0B3861","#0B2161","#0B0B61","#210B61","#380B61","#4C0B5F","#610B5E","#610B4B","#610B38","#610B21","#2E2E2E","#3B0B0B","#3B170B","#3B240B","#3A2F0B","#393B0B","#2E3B0B","#243B0B"];
        var selectedPolygon;

        function clearSelection() {
            if (selectedPolygon) {
                selectedPolygon.setEditable(false);
                selectedPolygon = null;
            }
        }

        function setSelection(shape) {
            clearSelection();
            selectedPolygon = shape;
            shape.setEditable(true);
            map.panTo(getPolygonCenter(shape.getPath().getArray()));
        }

        //return LatLng of polygon center
        function getPolygonCenter(verticesArray){
            var lat1 = 0;
            var lat2 = 0;
            var lng1 = 0;
            var lng2 = 0;
            for(var i in verticesArray){
                if(lat1==0 || verticesArray[i].lat()< lat1){
                    lat1 = verticesArray[i].lat();
                }
                if(lat2==0 || verticesArray[i].lat()> lat2){
                    lat2 = verticesArray[i].lat();
                }
                if(lng1==0 || verticesArray[i].lng()< lng1){
                    lng1 = verticesArray[i].lng();
                }
                if(lng2==0 || verticesArray[i].lng()> lng2){
                    lng2 = verticesArray[i].lng();
                }
            }
            return new google.maps.LatLng(lat1+(lat2-lat1)/2, lng1+(lng2-lng1)/2);
        }

        //function to initialize the map
        function initialize(elmId){
            geocoder =  new google.maps.Geocoder();
            var mapOptions = {
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                minZoom:15
            };
            map = new google.maps.Map(document.getElementById(elmId),
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
                    strokeWeight: 0.3,
                    clickable: true,
                    zIndex: 1,
                    editable: true
                }
            });
            drawingManager.setMap(map);
        }

        return {
            //sets the map location to address specified
            setMapLocation:function(address){
                geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.panTo(results[0].geometry.location);
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            },
            //add handler to polygoncomplete
            setPolygonHandlers:function(polygonCompleteHandler, polygonSelectedHandler){
                var clickHandler = function(polygon){
                    return function(){
                        setSelection(polygon);
                        polygonSelectedHandler(polygon);
                    }
                }

                google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon){
                    drawingManager.setDrawingMode(null);
                    polygon.set('fillColor',colors[Math.floor(Math.random()*colors.length)]);
                    google.maps.event.addListener(polygon, 'click', clickHandler(polygon));
                    clickHandler(polygon)();
                    polygonCompleteHandler(polygon);
                });
            },
            //show the polygon
            showPolygon:function(polygon){
                polygon.setMap(map);
            },
            //hide the polygon
            hidePolygon:function(polygon){
                polygon.setMap(null);
            },
            initialize:initialize,
            setSelection:setSelection
        };
    }).
    value('version', '0.1');
