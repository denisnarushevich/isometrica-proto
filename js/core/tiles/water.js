define(['./tile'], function(tile){
  var water = function(gridPoints, tiles){
    tile.call(this, gridPoints, tiles);
    this.type = this._WATER;
    this.slopeId = 2222;
    return this;
  }
  
  water.prototype = Object.create(tile.prototype);
  
  water.prototype.getTerrain = function(){
    if ( this.terrain ) return this.terrain;
    
    if ( this.getPosition().getW() == 1 ) this.terrain = 'water';
    else this.terrain = 'deepwater';
    
    return this.terrain; 
  }
  
  return water;
});