define(['./tileSprite'], function(tileSprite){
  var roadSprite = Object.create(tileSprite);
  
  roadSprite.getImages = function(){
    if (this.images) return this.images;
    
    tileSprite.getImages.call(this);
    
    this.images.push(g.resources.getImage('terrain/road/'+this.getModel().getSlopeId()));
        
    return this.images;
  }
  
  return roadSprite;
});