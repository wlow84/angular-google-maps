'use strict';

/* jasmine specs for controllers go here */

describe('StoreMapperCtrl', function(){
    beforeEach(function(){

    });


    it('should call set map at address', function() {
        var address = 'malltip mall'
        var scope={},
            map = {
                mapAddress:'',
                setMapLocation:function(e){
                    this.mapAddress = e;
                },
                setPolygonCompleteHandler:function(e){},
                showPolygon:function(e){},
                hidePolygon:function(e){}
            };
        var storeMapperCtrl = new StoreMapperCtrl(scope, map);
        scope.address = address;
        scope.setMapAtAddress();
        expect(map.mapAddress).toBe(address);
    });

    it('should insert polygon and show addStoreBar',function(){
        var scope={
                $apply:function(e){e();}
            },
            map = {
                setMapLocation:function(e){},
                setPolygonCompleteHandler:function(e){},
                showPolygon:function(e){},
                hidePolygon:function(e){}
            },
            polygon = {
                getPath:function(){
                    return {
                        getArray:function(){
                            return [1,2,3,4];
                        }
                    }
                }
            };
        var storeMapperCtrl = new StoreMapperCtrl(scope, map);
        scope.polygonCompleted(polygon);
        expect(scope.stores.length).toBe(1);
        expect(scope.stores[0].showOverlay).toBe(true);
        expect(scope.showStoreBar).toBe(true);
    });
});
