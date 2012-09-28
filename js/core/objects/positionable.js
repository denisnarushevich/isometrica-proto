define(['./object', '../vector2', '../grid'], function(object, vec2, grid){
  var pos = function(tile){
    object.call(this, tile); //parent init()
    this.subPosition = new vec2(0,0);
    return this;
  }
  
  pos.prototype = Object.create(object.prototype);
  
  pos.prototype.subPosition = null;
  
  pos.prototype.getPosition = function(){
    return grid.getPoint(this.getTile().getPosition().getX() + this.getSubPosition().getX(), this.getTile().getPosition().getY() + this.getSubPosition().getY());
  };
  
  pos.prototype.getSubPosition = function(){
    return this.subPosition; 
  };
  
  return pos;
});