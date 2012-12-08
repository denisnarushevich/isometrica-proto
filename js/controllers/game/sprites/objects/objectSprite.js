define(['./../sprite'], function(Parent){
    function ObjectSprite(ObjectSprites, model) {
        Parent.call(this, ObjectSprites, model);
  };
  
  ObjectSprite.prototype = Object.create(Parent.prototype);
  ObjectSprite.prototype.type = "ObjectSprite";

  ObjectSprite.prototype.type = 1;

  ObjectSprite.prototype.getImages = function(){
    var name = this.model.getName();
    return [this.sprites.images.getImage('objects/'+name+'/'+name)];
  }
  
  return ObjectSprite;
});

