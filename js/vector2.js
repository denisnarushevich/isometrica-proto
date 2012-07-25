define(function(){
  var vector2 = {
    x: null,
    y: null
  };
  
  vector2.getX = function(){
    return this.x;
  }
  
  vector2.getY = function(){
    return this.y;
  }
  
  vector2.setX = function(x){
    this.x = x;
    return this;
  }
  
  vector2.setY = function(y){
    this.y = y;
    return this;
  }
  
  vector2.normalize = function(){
    this.y = this.y / Math.abs(this.y);
    this.x = this.x / Math.abs(this.x);
    return this;
  }
  
  return vector2;
});