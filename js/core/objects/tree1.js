define(['./tree'], function(tree){
  var tree1 = Object.create(tree);
  tree1.init = function(tile){
    tree.init.call(this, tile); //parent init
    this.name = 'tree1';
    return this;
  }
  
  return tree1;
});