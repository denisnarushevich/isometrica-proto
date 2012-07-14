define(['./land', 'sprites/shoreTileSprite'], function(tile, sprite){
  var shore = Object.create(tile);
  
  shore.init = function(gridPoints){
    tile.init.call(this, gridPoints);
    this.type = 'shore';
    this.sprite = Object.create(sprite).setModel(this);
    return this;
  };
  
  shore.getObjects = function(){
    if (this.objects) return this.objects;
    
    return this.objects = [];
  };

  return shore;
});