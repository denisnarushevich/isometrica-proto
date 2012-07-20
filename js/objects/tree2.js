define(['./tree'], function(tree){
  var tree2 = Object.create(tree);
  tree2.init = function(tile){
    tree.init.call(this, tile); //parent init
    this.name = 'tree6';
    return this;
  }
  
  return tree2;
});