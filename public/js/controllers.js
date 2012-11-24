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

    var highlightStore = function(polygon){
        for(var store in $scope.stores){
            if($scope.stores[store].polygon===polygon){
                $scope.stores[store].highlight = 'highlight';
            }
            else{
                $scope.stores[store].highlight = '';
            }
        }
    };

    $scope.selectStore= function(store){
        maps.setSelection(store.polygon);
        highlightStore(store.polygon);
    };

    $scope.setMapAtAddress = function(){
        maps.setMapLocation($scope.address);
    };

    //toggles the display of an overlay
    $scope.updateOverlay = function(store){
        if(store.showOverlay){
            maps.showPolygon(store.polygon);
        }
        else{
            maps.hidePolygon(store.polygon);
        }
        return;
    }

    //delete a polygon from scope
    $scope.deleteStore = function(store){
        maps.hidePolygon(store.polygon);
        var index;
        for(var i=0; i < $scope.stores.length;i++){
            if(store===$scope.stores[i]){
                index = i;
                break;
            }
        }
        $scope.stores.splice(index,1);
    };

    //handler to capture the polygon completed event
    $scope.polygonCompleted = function(polygon){
        $scope.$apply(function(){
            var path = polygon.getPath().getArray();
            $scope.stores.push({name:"", number:"",vertices:path, polygon:polygon, showOverlay:true,highlight:'highlight'});
            $scope.showStoreBar = true;
        });
    };

    //handler to capture the polygon was selected
    $scope.polygonSelected = function(polygon){
        $scope.$apply(function(){
            highlightStore(polygon);
        });
    }

    maps.setMapLocation($scope.address);
    maps.setPolygonHandlers($scope.polygonCompleted,$scope.polygonSelected);
}
//MyCtrl1.$inject = [];


function MyCtrl2() {
}
//MyCtrl2.$inject = [];
