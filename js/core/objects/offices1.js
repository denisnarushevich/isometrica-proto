define(['./tallBuilding'], function(parent){
  var offices1 = function(tile){
    parent.call(this, tile); //parent init
    this.name = 'offices1';
  }
  
  offices1.prototype = Object.create(parent.prototype);
  
  return offices1;
});