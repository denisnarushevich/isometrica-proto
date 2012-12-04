define(['./vector2'], function(Vector2){
  function Vector3(x, y, z){
    Vector2.call(this, x, y);
    this.z = z;
  }
  
  var p = Vector3.prototype = Object.create(Vector2.prototype);
  
  p.z = 0;

    p.add = function(vector3){
        Vector2.prototype.add.call(this, vector3);
        this.z += vector3.z;
    }

    p.sub = function(vector3){
        Vector2.prototype.sub.call(this, vector3);
        this.z -= vector3.z;
    }

    p.scale = function(scale){
        Vector2.prototype.scale.call(this, scale);
        this.z *= scale;
    }

  p.normalize = function(){
    Vector2.prototype.normalize.call(this);
    this.z = this.z != 0 ? this.z / Math.abs(this.z) : 0;
    return this;
  }
  
  p.toString = function(){
    return this.x+','+this.y+','+this.z;
  }
  
  return Vector3;
});


