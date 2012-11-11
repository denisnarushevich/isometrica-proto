define(['./../sprite'], function(Parent){
    function ObjectSprite(ObjectSprites, model) {
        Parent.call(this, ObjectSprites, model);
  };
  
  ObjectSprite.prototype = Object.create(Parent.prototype);
  ObjectSprite.prototype.type = "ObjectSprite";

  ObjectSprite.prototype.type = 1;

  ObjectSprite.prototype.getImages = function(){
    Parent.prototype.getImages.call(this);
    var name = this.getModel().getName();
    this.images.push(this.sprites.images.getImage('objects/'+name+'/'+name));

    return this.images;
  }
  
  return ObjectSprite;
});

