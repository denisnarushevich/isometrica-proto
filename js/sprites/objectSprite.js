define(['./sprite'], function(sprite){
  var objectSprite = Object.create(sprite);
  
  objectSprite.getObject = function(){
    return this.object;
  }
  
  objectSprite.setObject = function(object){
    this.object = object;
    return this;
  }
  
  objectSprite.getImages = function(){
    if (this.images) return this.images;
    
    sprite.getImages.call(this);
    
    this.images.push(g.images.getImage('objects/'+this.getObject().getType()+'/'+this.getObject().getName()));

    return this.images;
  }
  
  return objectSprite;
});

