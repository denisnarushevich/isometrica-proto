define(['./building'], function(parent){
  var house2 = Object.create(parent);
  house2.init = function(tile){
    parent.init.call(this, tile); //parent init
    this.name = 'house2';
    return this;
  }
  
  return house2;
});