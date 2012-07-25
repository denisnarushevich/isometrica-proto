define(['vector2'], function(vector){
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
  
  return vector3;
});


