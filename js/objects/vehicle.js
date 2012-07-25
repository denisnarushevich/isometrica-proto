define(['./positionable', 'sprites/vehicleSprite', 'pathFinder', 'vector2'], function(parent, sprite, pathFinder, vector2){
  var vehicle = Object.create(parent);
  
  vehicle.init = function(tile){
    parent.init.call(this, tile);
    this.type = 'vehicle';
    this.sprite = Object.create(sprite).setModel(this);
    
    vehicle.direction = Object.create(vector2);
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
      //this.updatedAt = now;

      var distance = deltaTime * this.getSpeed();

      if ( distance >= this.getPath().length ) return;

      var pathTile = this.getPath()[ Math.floor(distance) ];
      this.setTile(pathTile);
    }
    return parent.update.call(this);
  };
  
  vehicle.getDirection = function(){
    return this.direction;
    
    if ( this.getPath().length ) {
      var dst = this.getPath()[0].getPosition();
      var src = this.getTile().getPosition();
      
      this.direction.setX(dst.getX() - src.getX());
      this.direction.setY(dst.getY() - src.getY());
      
      this.direction.normalize();
      
      return this.direction;
    } else
      return this.direction.setX(1).setY(0);
  };
  
  vehicle.getSubPosition = function(){
    return this.subPosition;
    
    if ( this.getDirection().getX() )
      if ( this.getDirection().getX() == 1 )
        this.subPosition.setY(0.31);
      else
        this.subPosition.setY(0.62);
    else
      if ( this.getDirection().getY() == 1 )
        this.subPosition.setX(0.31);
      else
        this.subPosition.setX(0.62);
    
    return this.subPosition;
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