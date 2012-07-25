define(['./tallBuilding'], function(parent){
  var flats1 = Object.create(parent);
  flats1.init = function(tile){
    parent.init.call(this, tile); //parent init
    this.name = 'flats1';
    return this;
  }
  
  return flats1;
});