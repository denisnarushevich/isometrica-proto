define(['./object', 'sprites/vehicleSprite'], function(object, vehicleSprite){
  var vehicle = Object.create(object);
  
  vehicle.init = function(){
    object.init.call(this);
    this.sprite = Object.create(vehicleSprite).setObject(this);
    vehicle.type = 'vehicle';

  
    vehicle.speed = 0.5; //tiles in second
    vehicle.direction = 1;
    vehicle.destination = null;
    vehicle.time = null;
    
    return this;
  }
  /*
  vehicle.getZ = function(){
    return g.world.grid.getGridPoint(this.x, this.y).getZ();
  };
  
  vehicle.moveTo = function(xy){
    this.destination = xy;
    this.time = new Date().getTime()/1000;
  }
  
  vehicle.getX = function(){
    return object.getX.call(this);
    var distance = Math.abs(this.x - this.destination[0]) + Math.abs(this.y - this.destination[1]);
    var now = new Date().getTime()/1000;
    var dTime = now - this.time;
    var passed = dTime * this.speed;
    
  }
  */
  return vehicle;
  
});