define(['./tileSprite', '../resources'], function(tileSprite, resources){
  var roadSprite = Object.create(tileSprite);
  
  roadSprite.getImages = function(){
    if (this.images) return this.images;
    
    tileSprite.getImages.call(this);
    
    this.images.push(resources.getImage('terrain/road/'+this.getModel().getShape()+this.getModel().getPlacing()));
        
    return this.images;
  }
  
  return roadSprite;
});