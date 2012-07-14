define(['./tile', 'sprite/shoreTileSprite'], function(tile, sprite){
  var shore = Object.create(tile);
  
  shore.init = function(gridPoints){
    tile.init.call(this, gridPoints);
    this.type = 'shore';
    this.sprite = Object.create(sprite).setModel(this);
    return this;
  };

  return shore;
});