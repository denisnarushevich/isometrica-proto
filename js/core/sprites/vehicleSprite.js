define(['./objectSprite'], function(parent){
  var sprite = function(model){
    parent.call(this, model);
    this.setSize([16, 16]);
    this.setOrigin([8, 10]);
  };
  
  sprite.prototype = Object.create(parent.prototype);
  
  return sprite;
});