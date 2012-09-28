define(['./building'], function(parent){
  var house2 = function(tile){
    parent.call(this, tile); //parent init
    this.name = 'house2';
  }
  
  house2.prototype = Object.create(parent.prototype);
  
  return house2;
});