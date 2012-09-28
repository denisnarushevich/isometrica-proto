define(['./tallBuilding'], function(parent){
  var flats1 = function(tile){
    parent.call(this, tile); //parent init
    this.name = 'flats1';
  }
  
  flats1.prototype = Object.create(parent.prototype);
  
  return flats1;
});