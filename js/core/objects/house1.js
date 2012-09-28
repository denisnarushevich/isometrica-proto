define(['./building'], function(parent){
  var house1 = function(tile){
    parent.call(this, tile); //parent init
    this.name = 'house1';
  }
  
  house1.prototype = Object.create(parent.prototype);
  
  return house1;
});