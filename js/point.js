define(function(){
  var point = {
    x: null,
    y: null,
    z: null
  };
  
  point.getCoordinates = function(){
    return {
      x: this.getX(),
      y: this.getY(),
      z: this.getZ()
    }
  }
  
  point.getX = function(){
    return this.x;
  }
  
  point.getY = function(){
    return this.y;
  }
  
  point.getZ = function(){
    return this.z;
  }
  
  point.setCoordinates = function(coordinates){
    if ( typeof(coordinates.x) == 'number' ) this.x = coordinates.x;
    if ( typeof(coordinates.y) == 'number' ) this.y = coordinates.y;
    if ( typeof(coordinates.z) == 'number' ) this.z = coordinates.z;
    return this;
  }
  
  point.setX = function(x){
    this.x = x;
    return this;
  }
  
  point.setY = function(y){
    this.y = y;
    return this;
  }
  
  point.setZ = function(z){
    this.z = z;
    return this;
  }
  
  return point;
});