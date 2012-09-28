define(['./tallBuilding'], function(parent){
  var offices2 = function(tile){
    parent.call(this, tile); //parent init
    this.name = 'offices2';
  }
  
  offices2.prototype = Object.create(parent.prototype);
  
  return offices2;
});