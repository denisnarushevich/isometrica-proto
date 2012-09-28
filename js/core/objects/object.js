define(function(){
  var object = function(tile){
    this.tile = tile;
  };
  
  object.prototype.getName = function(){
    return this.name;
  };
  
  object.prototype.getPosition = function(){
    return this.tile.getPosition();
  };
  
  object.prototype.getSprite = function(){
    return this.sprite;
  };
  
  object.prototype.getType = function(){
    return this.type;
  };
  
  object.prototype.getTile = function(){
    return this.tile;
  };
  
  object.prototype.setName = function(name){
    this.name = name;
    return this;
  };
  
  object.prototype.setType = function(typeName){
    this.type = typeName;
    return this;
  };
  
  object.prototype.setTile = function(tile){
    this.tile = tile;
    return this;
  };
  
  object.prototype.update = function(){
    return this;
  }
  
  return object;
});