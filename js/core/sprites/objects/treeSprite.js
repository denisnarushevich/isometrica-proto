define(['./objectSprite'], function(parent){
  var Sprite = function(model){
    parent.call(this, model);
    this.setSize([64, 64]);
    this.setOrigin([34, 53]);
  };
  
  Sprite.prototype = Object.create(parent.prototype);
    Sprite.prototype.name = 'tree';
  
  return Sprite;
});