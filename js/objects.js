define([
  'objects/tree/tree1',
  'objects/vehicle'
], function(tree1, vehicle){
  
  return g.objects ? g.objects : g.objects = {
    tree: {
      'tree1': tree1
    },
    vehicle: {
      'test': test
    },
    createTree: function(name){
      return Object.create(this.tree[name]).init();
    },
    createVehicle: function(name){
      
      var v = Object.create(vehicle).init();
      console.log(v);
      
      return v;
    }
  }
});