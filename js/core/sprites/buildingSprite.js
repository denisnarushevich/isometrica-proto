define(['./objectSprite'], function(parent){
  var sprite = function(model){
    parent.call(this, model);
    this.setSize([64, 64]);
    this.setOrigin([0, 49]);
  };
  
  sprite.prototype = Object.create(parent.prototype);
  
  return sprite;
});