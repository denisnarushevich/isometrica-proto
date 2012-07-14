define(['./sprite'], function(sprite){
  var tileSprite = Object.create(sprite);
  
  tileSprite.size = [64, 47];
  tileSprite.origin = [0, 24];
  
  tileSprite.getImages = function(){
    if (this.images) return this.images;
    
    sprite.getImages.call(this);
    
    this.images.push(g.resources.getImage('terrain/'+this.getModel().getTerrain()+'/'+this.getModel().getSlopeId()));
        
    return this.images;
  }
  
  return tileSprite;
});

