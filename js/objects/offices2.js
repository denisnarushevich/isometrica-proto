define(['./tallBuilding'], function(parent){
  var offices2 = Object.create(parent);
  offices2.init = function(tile){
    parent.init.call(this, tile); //parent init
    this.name = 'offices2';
    return this;
  }
  
  return offices2;
});