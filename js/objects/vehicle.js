define(['./positionable', 'sprites/vehicleSprite', 'pathFinder', 'vector2', 'tiles'], function(parent, sprite, pathFinder, vector2, tiles){
  var vehicle = Object.create(parent);
  
  vehicle.init = function(tile){
    parent.init.call(this, tile);
    this.type = 'vehicle';
    this.sprite = Object.create(sprite).setModel(this);
    
    vehicle.direction = Object.create(vector2).setX(1).setY(0)
    vehicle.speed = 2; //tiles in second
    vehicle.path = [];
    vehicle.updatedAt = null;
      
    return this;
  };
  
  vehicle.travelTo = function(destinationTile){
    this.path = pathFinder.findPath(this.getTile(), destinationTile, function(tile){
      return tile.getType() != 'road';
    });
    this.updatedAt = new Date().getTime()/1000;
  };
  
  vehicle.update = function(){
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
    return parent.update.call(this);
  };
  
  vehicle.getDirection = function(){
    return this.direction;
  };
  
  vehicle.getSubPosition = function(){
    return this.subPosition;
  };
  
  vehicle.align = function(){
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
  
  vehicle.getSpeed = function(){
    return this.speed;
  };
  
  vehicle.getPath = function(){
    return this.path;
  };
  
  vehicle.setTile = function(tile){
    this.getTile().removeObject(this);
    this.tile = tile;
    tile.addObject(this);
    return this;
  };

  return vehicle;
});