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
  
  return vector3;
});


