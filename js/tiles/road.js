define(['./land'], function(tile){
  var road = Object.create(tile);
  
  road.init = function(gridPoints){
    tile.init.call(this, gridPoints);
    this.type = 'road';
    this.shape = 0;
    this.placing = 0;
    return this;
  };
  
  road.getObjects = function(){
    if (this.objects) return this.objects;
    
    return this.objects = [];
  };

  return road;
});