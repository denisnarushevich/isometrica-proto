define(['./tileSprite', '../resources'], function(tileSprite, resources){
  var shoreSprite = Object.create(tileSprite);
  
  shoreSprite.getImages = function(){
    if (this.images) return this.images;
    
    tileSprite.getImages.call(this);
    
    this.images.push(resources.getImage('terrain/shore/'+this.getModel().getSlopeId()));
        
    return this.images;
  }
  
  return shoreSprite;
});