define(['./tallBuilding'], function(parent){
  var offices1 = Object.create(parent);
  offices1.init = function(tile){
    parent.init.call(this, tile); //parent init
    this.name = 'offices1';
    return this;
  }
  
  return offices1;
});