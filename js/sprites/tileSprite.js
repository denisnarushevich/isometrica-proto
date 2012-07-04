define(['./sprite'], function(sprite){
  var tileSprite = Object.create(sprite).init([64, 47], [0, 24]);
  
  tileSprite.getTile = function(){
    return this.tile;
  }
  
  tileSprite.setTile = function(tile){
    this.tile = tile;
    return this;
  }
  
  tileSprite.getImages = function(){
    if (this.images) return this.images;
    
    sprite.getImages.call(this);
    
    this.images.push(g.resources.getImage('terrain/'+this.getTile().getTerrain()+'/'+this.getTile().getSlopeId()));
      
    if(this.getTile().isShore())
      this.images.push(g.resources.getImage('terrain/shore/'+this.getTile().getSlopeId()));
        
    return this.images;
  }
  
  return tileSprite;
});

