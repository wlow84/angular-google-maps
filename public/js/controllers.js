'use strict';

/* Controllers */

function AppCtrl($scope, $http) {
    $http({method: 'GET', url: '/api/name'}).
        success(function(data, status, headers, config) {
            $scope.name = data.name;
        }).
        error(function(data, status, headers, config) {
            $scope.name = 'Error!';
        });
}

function StoreMapperCtrl($scope, maps) {
    //model props
    $scope.showAddressBar = false;
    $scope.address = 'Mall of america';
    $scope.showStoreBar = false;
    $scope.stores = [];

    $scope.setMapAtAddress = function(){
        maps.setMapLocation($scope.address);
    };

    //toggles the display of an overlay
    $scope.toggleOverlay = function(index){
        var store = $scope.stores[index];
        if(store.showOverlay){
            maps.showPolygon(store.polygon);
        }
        else{
            maps.hidePolygon(store.polygon);
        }
        return;
    }

    //delete a polygon from scope
    $scope.deleteStore = function(index){
        var store = $scope.stores[index];
        maps.hidePolygon(store.polygon);
        $scope.stores.splice(index,1);
    };

    //handler to capture the polygon completed event
    $scope.polygonCompleted = function(polygon){
        $scope.$apply(function(){
            var path = polygon.getPath().getArray();
            $scope.stores.push({name:"", vertices:path, polygon:polygon, showOverlay:true});
            $scope.showStoreBar = true;
        });
    };

    maps.setMapLocation($scope.address);
    maps.setPolygonCompleteHandler($scope.polygonCompleted);
}
//MyCtrl1.$inject = [];


function MyCtrl2() {
}
//MyCtrl2.$inject = [];
