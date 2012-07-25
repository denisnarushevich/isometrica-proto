define(['./building'], function(parent){
  var houses2 = Object.create(parent);
  houses2.init = function(tile){
    parent.init.call(this, tile); //parent init
    this.name = 'houses2';
    return this;
  }
  
  return houses2;
});