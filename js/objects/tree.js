define(['objects/object'], function(object){
  Tree = Object.create(object);

  Tree.init = function(){
    object.init.call(this); //parent init()
    this.type = 'tree';
    this.getSprite().setSize([64, 64]);
    this.getSprite().setOrigin([34, 53]);
    return this;
  }
  
  return Tree;
});