define(['./tree'], function(parent){
  var tree1 = function(tile){
    parent.call(this, tile);
    this.name = 'tree1';
  }
  
  tree1.prototype = Object.create(parent.prototype);
  
  return tree1;
});