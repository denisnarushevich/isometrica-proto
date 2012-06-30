define(['./object', 'sprites/treeSprite'], function(object, treeSprite){
  Tree = Object.create(object);

  Tree.init = function(){
    object.init.call(this); //parent init()
    this.type = 'tree';
    this.sprite = Object.create(treeSprite).setObject(this);
    return this;
  }
  
  return Tree;
});