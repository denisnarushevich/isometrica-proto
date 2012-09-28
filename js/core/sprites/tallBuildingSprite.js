define(['./buildingSprite'], function(parent){
  var sprite = function(model){
    parent.call(this, model);
    this.setSize([64, 128]);
    this.setOrigin([0, 113]);
  };
  
  sprite.prototype = Object.create(parent.prototype);
  
  return sprite;
});