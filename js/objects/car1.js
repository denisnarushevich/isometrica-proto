define(['./vehicle'], function(parent){
  var car1 = Object.create(parent);
  
  car1.init = function(tile){
    parent.init.call(this, tile); //parent init
    this.name = 'car1';
    return this;
  }
  
  return car1;
});