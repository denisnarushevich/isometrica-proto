define(['./buildingSprite'], function(parent){
  var Sprite = function(model){
    parent.call(this, model);
    this.setSize([64, 128]);
    this.setOrigin([0, 113]);
  };
  
  Sprite.prototype = Object.create(parent.prototype);
  Sprite.prototype.name = 'tallBuilding';
  
  return Sprite;
});