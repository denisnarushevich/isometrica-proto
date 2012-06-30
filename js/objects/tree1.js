define(['./tree'], function(tree){
  var tree1 = Object.create(tree);
  tree1.init = function(){
    tree.init.call(this); //parent init
    this.name = 'tree1';
    return this;
  }
  
  return tree1;
});