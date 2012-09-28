define(['./tree'], function(parent){
  var tree2 = function(tile){
    parent.call(this, tile);
    this.name = 'tree6';
  }
  
  tree2.prototype = Object.create(parent.prototype);
  
  return tree2;
});