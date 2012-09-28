define(['./building'], function(parent){
  var houses1 = function(tile){
    parent.call(this, tile); //parent init
    this.name = 'houses1';
  }
  
  houses1.prototype = Object.create(parent.prototype);
  
  return houses1;
});