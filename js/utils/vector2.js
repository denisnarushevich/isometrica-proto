define(function(){
  function Vector2(x, y){
    this.x = x;
    this.y = y;
  };

  var p = Vector2.prototype;

  p.x = 0;
  p.y = 0;

    p.add = function(vector2){
        this.x += vector2.x;
        this.y += vector2.y;
    }

    p.sub = function(vector2){
        this.x -= vector2.x;
        this.y -= vector2.y;
    }

    p.scale = function(scale){
        this.x *= scale;
        this.y *= scale;
    }

  p.normalize = function(){
    this.x = this.x != 0 ? this.x / Math.abs(this.x) : 0;
    this.y = this.y != 0 ? this.y / Math.abs(this.y) : 0;
    return this;
  }

  p.toString = function(){
    return this.x+','+this.y;
  }
  
  return Vector2;
});