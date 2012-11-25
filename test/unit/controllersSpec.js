'use strict';

/* jasmine specs for controllers go here */

describe('StoreMapperCtrl', function(){
    var scope, map, storeMapperCtrl;

    beforeEach(function(){
        scope={
            $apply:function(e){e();}
        },
            map = {
                setMapLocation:function(e){},
                setPolygonHandlers:function(e){},
                showPolygon:function(e){},
                hidePolygon:function(e){},
                setSelection:function(e){},
                initialize:function(e){}
            };
        spyOn(map,'setMapLocation');
        spyOn(map,'showPolygon');
        spyOn(map,'hidePolygon');
        spyOn(map,'setSelection').andCallThrough();
        spyOn(map,'initialize');
        storeMapperCtrl = new StoreMapperCtrl(scope, map);
    });

    it('should call the map initialize',function(){
        var testElm = 'test-elm';
        scope.initialize(testElm);
        expect(map.initialize).toHaveBeenCalledWith(testElm);
    });

    it('should call set map at address', function() {
        var address = 'malltip mall';
        scope.address = address;
        scope.setMapAtAddress();
        expect(map.setMapLocation).toHaveBeenCalledWith(address);
    });

    it('should insert polygon and show addStoreBar',function(){
        var polygon = {
            getPath:function(){
                return {
                    getArray:function(){
                        return [1,2,3,4];
                    }
                }
            }
        };
        scope.polygonCompleted(polygon);
        expect(scope.stores.length).toBe(1);
        expect(scope.stores[0].showOverlay).toBe(true);
        expect(scope.showStoreBar).toBe(true);
    });

    it('should toggle the overlay of a selected polygon', function(){
        var polygon = {
            getPath:function(){
                return {
                    getArray:function(){
                        return [1,2,3,4];
                    }
                }
            }
        };

        scope.polygonCompleted(polygon);
        expect(scope.stores.length).toBe(1);
        expect(scope.stores[0].showOverlay).toBe(true);
        expect(scope.showStoreBar).toBe(true);
        scope.updateOverlay(scope.stores[0]);
        expect(map.showPolygon).toHaveBeenCalled();
        scope.stores[0].showOverlay = false;
        scope.updateOverlay(0);
        expect(map.hidePolygon).toHaveBeenCalled();
    });

    it('should delete the store at an index',function(){
        var polygon = {
                getPath:function(){
                    return {
                        getArray:function(){
                            return [1,2,3,4];
                        }
                    }
                }
            };
        scope.polygonCompleted(polygon);
        scope.polygonCompleted(polygon);
        scope.polygonCompleted(polygon);
        expect(scope.stores.length).toBe(3);
        scope.deleteStore(1);
        expect(scope.stores.length).toBe(2);
        expect(map.hidePolygon).toHaveBeenCalled();
    });

    it('should set the highlight when polygonSelected is called',function(){
        var polygon = {
                getPath:function(){
                    return {
                        getArray:function(){
                            return [1,2,3,4];
                        }
                    }
                }
            },
            polygon1 = {
                getPath:function(){
                    return {
                        getArray:function(){
                            return [5,6,7,8];
                        }
                    }
                }
            };
        scope.polygonCompleted(polygon);
        expect(scope.stores[0].highlight).toBe('highlight');
        scope.polygonCompleted(polygon1);
        scope.polygonSelected(polygon1);
        expect(scope.stores[0].highlight).toBe('');
        expect(scope.stores[1].highlight).toBe('highlight');
    });

    it('should set the highlight when selectStore is called',function(){
        var polygon = {
                getPath:function(){
                    return {
                        getArray:function(){
                            return [1,2,3,4];
                        }
                    }
                }
            },
            polygon1 = {
                getPath:function(){
                    return {
                        getArray:function(){
                            return [5,6,7,8];
                        }
                    }
                }
            };
        scope.polygonCompleted(polygon);
        expect(scope.stores[0].highlight).toBe('highlight');
        scope.polygonCompleted(polygon1);
        scope.selectStore(scope.stores[1]);
        expect(map.setSelection).toHaveBeenCalled();
        expect(scope.stores[0].highlight).toBe('');
        expect(scope.stores[1].highlight).toBe('highlight');
    });
});
