define(['./object', '../sprites/buildingSprite'], function(parent, sprite){
  var building = function(tile){
    parent.call(this, tile); //parent init()
    this.type = 'building';
    this.sprite = new sprite(this);
  }
  
  building.prototype = Object.create(parent.prototype);
  
  return building;
});
  