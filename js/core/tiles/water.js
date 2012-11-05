define(['./tile', '../vector3'], function(Tile, Vec3){
  var Water = function(tiles, gridPoints){
    Tile.call(this, tiles, gridPoints);
    this.type = this._WATER;
    this.typeName = 'water';
    this.slopeId = 2222;
    this.deepness = tiles.world.getWaterLevel() - this.getPosition().getZ();
    this.setPosition(new Vec3(this.getPosition().getX(), this.getPosition().getY(), tiles.world.getWaterLevel()));
    return this;
  }
  
  Water.prototype = Object.create(Tile.prototype);

  Water.prototype.deepness = null;
  
  Water.prototype.getTerrain = function(){
    if ( this.terrain ) return this.terrain;
    
    if ( this.deepness == 0 ) this.terrain = 'water';
    else this.terrain = 'deepwater';
    
    return this.terrain; 
  }
  
  return Water;
});