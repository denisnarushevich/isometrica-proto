define(['./building'], function(parent){
  var houses2 = function(tile){
    parent.call(this, tile); //parent init
    this.name = 'houses2';
  }
  
  houses2.prototype = Object.create(parent.prototype);
  
  return houses2;
});