define(['./tileSprite', '../resources'], function(parent, resources){
  var sprite = function(model){
    parent.call(this, model);
  };
  
  sprite.prototype = Object.create(parent.prototype);
  
  sprite.prototype.getImages = function(){
    if (this.images) return this.images;
    
    parent.prototype.getImages.call(this);
    
    this.images.push(resources.getImage('terrain/shore/'+this.getModel().getSlopeId()));

    return this.images;
  }
  
  return sprite;
});