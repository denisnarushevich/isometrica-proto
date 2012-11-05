define(['./../sprite'], function(Parent){
  var Sprite = function(model){
    Parent.call(this, model);
  };
  
  Sprite.prototype = Object.create(Parent.prototype);

  Sprite.prototype.type = 'object';

  Sprite.prototype.getImages = function(){
    if (this.images) return this.images;
    
    Parent.prototype.getImages.call(this);
    
    this.images.push(this.sprites.images.getImage('objects/'+this.getModel().getType()+'/'+this.getModel().getName()));

    return this.images;
  }
  
  return Sprite;
});

