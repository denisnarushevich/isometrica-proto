define(['./object', 'sprites/vehicleSprite'], function(object, vehicleSprite){
  var vehicle = Object.create(object);
  
  vehicle.init = function(){
    object.init.call(this);
    this.type = 'vehicle';
    this.sprite = Object.create(vehicleSprite).setObject(this);

  
    vehicle.speed = 2; //tiles in second
    vehicle.startingPoint = [0, 0]
    vehicle.destinationPoint = [0, 0];
    vehicle.dispatch = 0;
    
    return this;
  }
  
  vehicle.roam = function(){
    this.startingPoint = [this.getX(), this.getY()];
    this.destinationPoint = ([[1,0], [-1,0], [0,1], [0,-1]])[Math.floor(Math.random()*4)];
    //this.destinationPoint[0] += Math.floor(this.getX());
    //this.destinationPoint[1] += Math.floor(this.getY());
    this.dispatch = new Date().getTime()/1000;
    return this
  },
  
  vehicle.update = function(){
    var now = new Date().getTime()/1000;
    var traveled = (now - this.dispatch) * this.speed;
    var traveled2 = (traveled >= 1 ? 1 : traveled);
    
    var oldTile = this.getTile();
    
    this.setX(this.startingPoint[0] + this.destinationPoint[0] * traveled2);
    this.setY(this.startingPoint[1] + this.destinationPoint[1] * traveled2);
    
    if(oldTile.getX() != this.getTile().getX() || oldTile.getY() != this.getTile().getY()){
      oldTile.removeObject(this);
      this.getTile().addObject(this);
    }
    
    if ( traveled2 >= 1) this.roam();
    
    return object.update.call(this);
  }

  vehicle.getZ = function(){
    return g.world.grid.getGridPoint(this.getX(), this.getY()).getZ();
  };

  return vehicle;
});