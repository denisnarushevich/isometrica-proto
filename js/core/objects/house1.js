define(['./building'], function(parent){
  var house1 = Object.create(parent);
  house1.init = function(tile){
    parent.init.call(this, tile); //parent init
    this.name = 'house1';
    return this;
  }
  
  return house1;
});