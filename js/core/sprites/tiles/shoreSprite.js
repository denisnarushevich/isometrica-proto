define(['./tileSprite'], function(parent){
  var Sprite = function(model){
    parent.call(this, model);
  };
  
  Sprite.prototype = Object.create(parent.prototype);
  Sprite.prototype.name = 'shore';
  
  Sprite.prototype.getImages = function(){
    if (this.images) return this.images;
    
    parent.prototype.getImages.call(this);
    
    this.images.push(this.sprites.images.getImage('terrain/shore/'+this.getModel().getSlopeId()));

    return this.images;
  }
  
  return Sprite;
});