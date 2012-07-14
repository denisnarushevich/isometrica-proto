define(['./tile'], function(tile){
  var water = Object.create(tile);
  
  water.init = function(gridPoints){
    tile.init.call(this, gridPoints);
    this.type = 'water';
    return this;
  };
  
  water.getTerrain = function(){
    if ( this.terrain ) return this.terrain;
    
    if ( this.getPosition().getW() == 1 ) return this.terrain = 'water';
    else this.terrain = 'deepwater';
  };
  
  return water;
});