define(['./object', 'vector2', 'grid'], function(object, vector2, grid){
  var pos = Object.create(object);
  
  pos.subPosition = null;
  pos.position = null;
  
  pos.init = function(tile){
    object.init.call(this, tile); //parent init()
    this.subPosition = Object.create(vector2).setX(0).setY(0);
    return this;
  };
  
  pos.getPosition = function(){
    return grid.getPoint(this.getTile().getPosition().getX() + this.getSubPosition().getX(), this.getTile().getPosition().getY() + this.getSubPosition().getY());
  };
  
  pos.getSubPosition = function(){
    return this.subPosition;
  }
  
  return pos;
});