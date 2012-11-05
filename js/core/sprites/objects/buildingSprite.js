define(['./objectSprite'], function(parent){
  var Sprite = function(model){
    parent.call(this, model);
    this.setSize([64, 64]);
    this.setOrigin([0, 49]);
  };
  
  Sprite.prototype = Object.create(parent.prototype);
  Sprite.prototype.name = 'building';
  
  return Sprite;
});