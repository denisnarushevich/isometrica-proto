define([
  'objects/tree1',
  'objects/car1'
], function(tree1, car){
  
  return {
    objects: {
      'tree1': tree1,
      'car1': car
    },
    create: function(name){
      return Object.create(this.objects[name]).init();
    }
  }
});