define(['./object', '../sprites/tallBuildingSprite'], function(parent, sprite){
  var building = Object.create(parent);

  building.init = function(tile){
    parent.init.call(this, tile); //parent init()
    this.type = 'building';
    this.sprite = Object.create(sprite).setModel(this);
    return this;
  }

  return building;
});
  