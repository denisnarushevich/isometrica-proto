define(['./positionable', '../sprites/treeSprite'], function(parent, sprite){
  var tree = function(tile){
    parent.call(this, tile); //parent init
    this.type = 'tree';
    this.sprite =  new sprite(this);
  }
  
  tree.prototype = Object.create(parent.prototype);
  
  tree.prototype.getPosition = function(){
    //just caching position, we don't need to calc it every time its same all the time.
    if ( this.position ) return this.position;
    return this.position = parent.prototype.getPosition.call(this); 
  }
  
  return tree;
});