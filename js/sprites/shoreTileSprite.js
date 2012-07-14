define(['./tileSprite'], function(tileSprite){
  var shoreSprite = Object.create(tileSprite);
  
  shoreSprite.getImages = function(){
    if (this.images) return this.images;
    
    tileSprite.getImages.call(this);
    
    this.images.push(g.resources.getImage('terrain/shore/'+this.getModel().getSlopeId()));
        
    return this.images;
  }
  
  return shoreSprite;
});