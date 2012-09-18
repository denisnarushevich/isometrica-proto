define(['./sprite', '../resources'], function(sprite, resources){
  var objectSprite = Object.create(sprite);
  
  objectSprite.getImages = function(){
    if (this.images) return this.images;
    
    sprite.getImages.call(this);
    
    this.images.push(resources.getImage('objects/'+this.getModel().getType()+'/'+this.getModel().getName()));

    return this.images;
  }
  
  return objectSprite;
});

