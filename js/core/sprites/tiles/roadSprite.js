define(['./tileSprite'], function(parent){
  var Sprite = function(model){
    parent.call(this, model);
  };
  
  Sprite.prototype = Object.create(parent.prototype);
  Sprite.prototype.name = 'road';
  
  Sprite.prototype.getImages = function(){
    if (this.images) return this.images;
    
    parent.prototype.getImages.call(this);
    
    this.images.push(resources.getImage('terrain/road/'+this.getModel().getShape()+'-'+this.getModel().getPlacing()));

    return this.images;
  }
  
  return Sprite;
});