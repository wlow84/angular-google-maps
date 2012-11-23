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
                setPolygonHandlers:function(e){},
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
                setPolygonHandlers:function(e){},
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

    it('should toggle the overlay of a selected polygon', function(){
        var scope={
                $apply:function(e){e();}
            },
            map = {
                showCalled:false,
                hideCalled:false,
                setMapLocation:function(e){},
                setPolygonHandlers:function(e){},
                showPolygon:function(e){
                    this.showCalled=true;
                },
                hidePolygon:function(e){
                    this.hideCalled=true;
                }
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
        scope.updateOverlay(scope.stores[0]);
        expect(map.showCalled).toBe(true);
        scope.stores[0].showOverlay = false;
        scope.updateOverlay(0);
        expect(map.hideCalled).toBe(true);
    });

    it('should delete the store at an index',function(){
        var scope={
                $apply:function(e){e();}
            },
            map = {
                hideCalled:false,
                setMapLocation:function(e){},
                setPolygonHandlers:function(e){},
                showPolygon:function(e){},
                setPolygonColor:function(){},
                hidePolygon:function(e){
                    this.hideCalled=true;
                }
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
        scope.polygonCompleted(polygon);
        scope.polygonCompleted(polygon);
        expect(scope.stores.length).toBe(3);
        scope.deleteStore(1);
        expect(scope.stores.length).toBe(2);
        expect(map.hideCalled).toBe(true);

    })
});
