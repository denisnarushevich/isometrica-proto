define(['./sprite', '../resources'], function(sprite, resources){
  var tileSprite = Object.create(sprite);
  
  tileSprite.size = [64, 47];
  tileSprite.origin = [0, 24];
  
  tileSprite.highlited = false;
  
  tileSprite.getImages = function(){
    if (this.images) return this.images;
    
    sprite.getImages.call(this);
    
    this.images.push(resources.getImage('terrain/'+this.getModel().getTerrain()+'/'+this.getModel().getSlopeId()));
        
    return this.images;
  }
  
  tileSprite.highlite = function(bool){
    if (bool != undefined) this.highlited = bool;
    
    if(bool != undefined && !bool){
      this.images = null;
    }else
      this.getImages().push(resources.getImage('terrain/oldgrass/'+this.getModel().getSlopeId()));
    
    return this;
  }
  
  return tileSprite;
});

