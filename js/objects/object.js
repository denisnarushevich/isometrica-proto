define(function(){
  var object = {
    name: null,
    sprite: null,
    type: null,
    tile: null
  };

  object.init = function(tile){
    this.tile = tile;
    return this;
  }
  
  object.getName = function(){
    return this.name;
  };
  
  object.getPosition = function(){
    return this.tile.getPosition();
  };
  
  object.getSprite = function(){
    return this.sprite;
  };
  
  object.getType = function(){
    return this.type;
  };
  
  object.getTile = function(){
    return this.tile;
  };
  
  object.setName = function(name){
    this.name = name;
    return this;
  };
  
  object.setType = function(typeName){
    this.type = typeName;
    return this;
  };
  
  object.setTile = function(tile){
    this.tile = tile;
    return this;
  };
  
  object.update = function(){
    return this;
  }
  
  return object;
});