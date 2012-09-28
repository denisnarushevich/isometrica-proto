define(['./positionable', '../sprites/vehicleSprite', '../pathFinder', '../vector2', '../tiles'], function(parent, sprite, pathFinder, vec2, tiles){
  var vehicle = function(tile){
    parent.call(this, tile);
    this.type = 'vehicle';
    this.sprite =  new sprite(this);
    
    this.direction = new vec2(0, 0);
    this.speed = 2; //tiles in second
    this.path = [];
    this.updatedAt = null;
  };

  vehicle.prototype = Object.create(parent.prototype);

  vehicle.prototype.travelTo = function(destinationTile){
    this.path = pathFinder.findPath(this.getTile(), destinationTile, function(tile){
      return tile.getType() != tile._ROAD;
    });
    this.updatedAt = new Date().getTime()/1000;
  };
  
  vehicle.prototype.update = function(){
    if ( this.updatedAt ) {
      var now = new Date().getTime()/1000; //seconds, milliseconds
      var deltaTime = now - this.updatedAt;

      var distance = deltaTime * this.getSpeed();
        
      var next = this.getPath()[ Math.floor(distance+1) ];
      
      if ( !next ) {
        this.getTile().removeObject(this);
        return;
      }
      
      var current = this.getPath()[ Math.floor(distance) ];
      
      this.getDirection().setX(next.getPosition().getX() - current.getPosition().getX());
      this.getDirection().setY(next.getPosition().getY() - current.getPosition().getY());
      this.getDirection().normalize();
      
      this.getSubPosition().setX(this.getDirection().getX() * distance%1);
      this.getSubPosition().setY(this.getDirection().getY() * distance%1);
      
      this.align();
    if ( this.getDirection().getX() )
      this.subPosition.setX(this.getSubPosition().getX() + 1/2);
    else
      this.subPosition.setY(this.getSubPosition().getY() + 1/2);

      var pathTile = current;
      this.setTile(pathTile);
    }
    return parent.prototype.update.call(this);
  };
  
  vehicle.prototype.getDirection = function(){
    return this.direction;
  };
  
  vehicle.prototype.getSubPosition = function(){
    return this.subPosition;
  };
  
  vehicle.prototype.align = function(){
    if ( this.getDirection().getX() )
      if ( this.getDirection().getX() == 1 )
        this.subPosition.setY(0.33);
      else
        this.subPosition.setY(0.66);
    else
      if ( this.getDirection().getY() == 1 )
        this.subPosition.setX(0.66);
      else
        this.subPosition.setX(0.33);    
  };
  
  vehicle.prototype.getSpeed = function(){
    return this.speed;
  };
  
  vehicle.prototype.getPath = function(){
    return this.path;
  };
  
  vehicle.prototype.setTile = function(tile){
    this.getTile().removeObject(this);
    this.tile = tile;
    tile.addObject(this);
    return this;
  };

  return vehicle;
});