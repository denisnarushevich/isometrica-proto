define(['./tile', '../vector3'], function(Parent, Vec3){
  function WaterTile(tiles, gridPoints){
    Parent.call(this, tiles, gridPoints);
    this.slopeId = 2222;
    this.deepness = tiles.world.waterLevel - this.getPosition().getZ();
    this.setPosition(new Vec3(this.getPosition().getX(), this.getPosition().getY(), tiles.world.waterLevel));
    return this;
  }
  
  WaterTile.prototype = Object.create(Parent.prototype);
  WaterTile.prototype.type = 'WaterTile';
  WaterTile.prototype.spriteType = 'LandTileSprite';

  WaterTile.prototype.deepness = null;
  
  WaterTile.prototype.getTerrain = function(){
    if ( this.terrain ) return this.terrain;
    
    if ( this.deepness == 0 ) this.terrain = 'water';
    else this.terrain = 'deepwater';
    
    return this.terrain; 
  }
  
  return WaterTile;
});