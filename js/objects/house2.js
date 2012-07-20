define(['./building', 'sprites/house2Sprite'], function(building, sprite){
  var house2 = Object.create(building);
  house2.init = function(tile){
    building.init.call(this, tile); //parent init
    this.name = 'house2';
    this.sprite = Object.create(sprite).setModel(this);
    return this;
  }
  
  return house2;
});