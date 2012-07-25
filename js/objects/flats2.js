define(['./tallBuilding'], function(parent){
  var flats2 = Object.create(parent);
  flats2.init = function(tile){
    parent.init.call(this, tile); //parent init
    this.name = 'flats2';
    return this;
  }
  
  return flats2;
});