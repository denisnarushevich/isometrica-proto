define(['vector3'], function(point){
  var object = Object.create(point);

  object.init = function(){
    this.name = null;
    this.type = null;
    this.sprite = null;
    return this
  }
  
  object.getZ = function(){
    if ( this.z ) return this.z;
    return this.z = g.logic.world.grid.getPoint(this.getX(), this.getY()).getZ();
  };
  
  object.getName = function(){
    return this.name;
  };
  
  object.getType = function(){
    return this.type;
  };
  
  object.getTile = function(){
    return g.logic.world.tiles.getTile(this.x | 0, this.y | 0);
  };
  
  object.getSprite = function(){
    return this.sprite;
  };
  
  object.setName = function(name){
    this.name = name;
    return this;
  };
  
  object.setType = function(typeName){
    this.type = typeName;
    return this;
  };
  
  object.update = function(){
    return this;
  }
  
  return object;
});