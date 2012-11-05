define(['./../sprite'], function(Parent){
  var Sprite = function(model){
    Parent.call(this, model);
    this.setSize([64, 47]);
    this.setOrigin([0, 24]);
    this.highlited = false;
  };
  
  Sprite.prototype = Object.create(Parent.prototype);

  Sprite.prototype.type = 'tile';
  
  Sprite.prototype.getImages = function(){
    if (this.images) return this.images;
    
    Parent.prototype.getImages.call(this);

    this.images.push(this.sprites.images.getImage('terrain/'+this.getModel().getTerrain()+'/'+this.getModel().getSlopeId()));

    return this.images;
  };
  
  Sprite.prototype.highlite = function(bool){
    if (bool != undefined) this.highlited = bool;
    
    if(bool != undefined && !bool){
      this.images = null;
    }else
      this.getImages().push(resources.getImage('terrain/oldgrass/'+this.getModel().getSlopeId()));
    
    return this;
  }
  
  return Sprite;
});

