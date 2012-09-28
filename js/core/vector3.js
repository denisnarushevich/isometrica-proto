define(['./vector2'], function(v2){
  var v3 = function(x, y, z){
    v2.call(this, x, y);
    this.z = z;
  }
  
  v3.prototype = Object.create(v2.prototype);
  
  v3.prototype.z = 0;
  
  v3.prototype.getZ = function(){
    return this.z;
  }
  
  v3.prototype.setZ = function(z){
    this.z = z;
    return this;
  }
  
  v3.prototype.normalize = function(){
    v2.prototype.normalize.call(this);
    this.z = this.z / Math.abs(this.z);
    return this;
  }
  
  v3.prototype.toArray = function(){
    return [
      this.y,
      this.x,
      this.z
    ];
  }
  
  v3.prototype.toString = function(){
    return this.y+','+this.x+','+this.z;
  }
  
  return v3;
  
  
  
  
  var vector3 = Object.create(vector);
  
  vector3.z = null;
  
  vector3.getZ = function(){
    return this.z;
  }
  
  vector3.setZ = function(z){
    this.z = z;
    return this;
  }
  
  vector3.normalize = function(){
    this.y = this.y / Math.abs(this.y);
    this.x = this.x / Math.abs(this.x);
    this.z = this.z / Math.abs(this.z);
    return this;
  }
  
  vector3.toArray = function(){
    return [
      this.y,
      this.x,
      this.z
    ];
  }
  
  vector3.toString = function(){
    return this.y+','+this.x+','+this.z;
  }
  
  return vector3;
});


