define(['objects/object', 'graphics/scene/treeSprite'], function(object, treeSprite){
  Tree = Object.create(object);

  Tree.init = function(){
    object.init.call(this); //parent init()
    this.type = 'tree';
    return this;
  }
  
  Tree.getSprite = function(){
    if ( this.sprite ) return this.sprite;
    
    return this.sprite = Object.create(treeSprite);
  }
  
  return Tree;
});