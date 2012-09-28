define(['./vehicle'], function(parent){
  var car1 = function(tile){
    parent.call(this, tile); //parent init
    this.name = 'car1';
  };
  
  car1.prototype = Object.create(parent.prototype);
  
  return car1;
});