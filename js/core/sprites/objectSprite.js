define(['./sprite', '../resources'], function(parent, resources){
  var sprite = function(model){
    parent.call(this, model);
  };
  
  sprite.prototype = Object.create(parent.prototype);
  
  sprite.prototype.getImages = function(){
    if (this.images) return this.images;
    
    parent.prototype.getImages.call(this);
    
    this.images.push(resources.getImage('objects/'+this.getModel().getType()+'/'+this.getModel().getName()));

    return this.images;
  }
  
  return sprite;
});

