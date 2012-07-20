define(['./object', 'sprites/buildingSprite'], function(object, sprite){
  var building = Object.create(object);

  building.init = function(tile){
    object.init.call(this, tile); //parent init()
    this.type = 'building';
    this.sprite = Object.create(sprite).setModel(this);
    return this;
  }

  return building;
});
  