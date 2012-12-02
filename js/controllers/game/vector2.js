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
      if(this.y!=0)
    this.y = this.y / Math.abs(this.y);
      if(this.x!=0)
    this.x = this.x / Math.abs(this.x);
    return this;
  }
  
  v2.prototype.toArray = function(){
    return [
      this.x,
      this.y
    ];
  }
  
  v2.prototype.toString = function(){
    return this.x+','+this.y;
  }
  
  return v2;
});