define(['./tallBuilding'], function(parent){
  var flats2 = function(tile){
    parent.call(this, tile); //parent init
    this.name = 'flats2';
  }
  
  flats2.prototype = Object.create(parent.prototype);
  
  return flats2;
});