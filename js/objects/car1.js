define(['./vehicle'], function(vehicle){
  var car1 = Object.create(vehicle);
  
  car1.init = function(){
    vehicle.init.call(this); //parent init
    this.name = 'car1';
    return this;
  }
  
  return car1;
});