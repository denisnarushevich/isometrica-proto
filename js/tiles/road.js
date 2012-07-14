define(['./tile'], function(tile){
  var road = Object.create(tile);
  
  road.init = function(gridPoints){
    tile.init.call(this, gridPoints);
    this.type = 'road';
    this.shape = 0;
    road.placing = 0;
    return this;
  };  

  return road;
});