define(['./positionable', '../sprites/treeSprite'], function(object, treeSprite){
  var tree = Object.create(object);

  this.position = null;

  tree.init = function(tile){
    object.init.call(this, tile); //parent init()
    this.type = 'tree';
    this.sprite = Object.create(treeSprite).setModel(this);
    return this;
  }
  
  tree.getPosition = function(){
    if ( this.position ) return this.position;
    return this.position = object.getPosition.call(this);
  };
  
  return tree;
});