define([
  'objects/tree/tree1'
], function(tree1){
  
  return g.objects ? g.objects : g.objects = {
    tree: {
      'tree1': tree1
    },
    createTree: function(name){
      return Object.create(this.tree[name]);
    }
  }
});