define(['./sprite', '../resources'], function(parent, resources){
  var sprite = function(model){
    parent.call(this, model);
    this.setSize([64, 47]);
    this.setOrigin([0, 24]);
    this.highlited = false;
  };
  
  sprite.prototype = Object.create(parent.prototype);
  
  sprite.prototype.getImages = function(){
    if (this.images) return this.images;
    
    parent.prototype.getImages.call(this);
    
    this.images.push(resources.getImage('terrain/'+this.getModel().getTerrain()+'/'+this.getModel().getSlopeId()));

    return this.images;
  };
  
  sprite.prototype.highlite = function(bool){
    if (bool != undefined) this.highlited = bool;
    
    if(bool != undefined && !bool){
      this.images = null;
    }else
      this.getImages().push(resources.getImage('terrain/oldgrass/'+this.getModel().getSlopeId()));
    
    return this;
  }
  
  return sprite;
});

