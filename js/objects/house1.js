define(['./building'], function(building){
  var house1 = Object.create(building);
  house1.init = function(tile){
    building.init.call(this, tile); //parent init
    this.name = 'house1';
    return this;
  }
  
  return house1;
});