define(['./objectSprite'], function(parent){
  var Sprite = function(model){
    parent.call(this, model);
    this.setSize([16, 16]);
    this.setOrigin([8, 10]);
  };
  
  Sprite.prototype = Object.create(parent.prototype);
  Sprite.prototype.name = 'vehicle';
  
  return Sprite;
});