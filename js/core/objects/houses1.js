define(['./building'], function(parent){
  var houses1 = Object.create(parent);
  houses1.init = function(tile){
    parent.init.call(this, tile); //parent init
    this.name = 'houses1';
    return this;
  }
  
  return houses1;
});