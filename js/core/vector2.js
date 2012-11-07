define(function(){
  var v2 = function(x, y){
    this.x = x;
    this.y = y;
  };
  
  v2.prototype.x = 0;
  v2.prototype.y = 0;
  
  v2.prototype.getX = function(){
    return this.x;
  }
  
  v2.prototype.getY = function(){
    return this.y;
  }
  
  v2.prototype.setX = function(x){
    this.x = x;
    return this;
  }
  
  v2.prototype.setY = function(y){
    this.y = y;
    return this;
  }
  
  v2.prototype.normalize = function(){
    this.y = this.y / Math.abs(this.y);
    this.x = this.x / Math.abs(this.x);
    return this;
  }
  
  v2.prototype.toArray = function(){
    return new Int32Array([
      this.y,
      this.x
    ]);
  }
  
  v2.prototype.toString = function(){
    return this.x+','+this.y;
  }
  
  return v2;
  
  
  
  
  
  
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
  
  vector2.toArray = function(){
    return [
      this.y,
      this.x
    ];
  }
  
  vector2.toString = function(){
    return this.y+','+this.x;
  }
  
  return vector2;
});