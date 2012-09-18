define(['./tile'], function(tile){
  var water = Object.create(tile);
  
  water.init = function(gridPoints, tiles){
    tile.init.call(this, gridPoints, tiles);
    this.type = 'water';
    this.slopeId = 2222;
    return this;
  };
  
  water.getTerrain = function(){
    if ( this.terrain ) return this.terrain;
    
    if ( this.getPosition().getW() == 1 ) this.terrain = 'water';
    else this.terrain = 'deepwater';
    
    return this.terrain;
  };
  
  return water;
});