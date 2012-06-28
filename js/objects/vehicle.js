define(['object', 'graphics/scene/vehicleSprite'], function(object, vehicleSprite){
  var vehicle = Object.create(object);
  
  vehicle.type = 'vehicle';
  vehicle.name = 'test';
  
  vehicle.speed = 0.5; //tiles in second
  vehicle.direction = 1;
  vehicle.destination = null;
  vehicle.time = null;
  
  vehicle.init = function(){
    this.sprite = Object.create(vehicleSprite).setObject(this);
    object.init.call(this);
    return this;
  }
  
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
  
  return vehicle;
  
});