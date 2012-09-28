define(['./land', '../sprites/shoreTileSprite'], function(tile, sprite){
  var shore = function(gridPoints, tiles){
    tile.call(this, gridPoints, tiles);
    this.type = this._SHORE;
    this.sprite = new sprite(this);
    return this;
  }
  
  shore.prototype = Object.create(tile.prototype);

  shore.prototype.getObjects = function(){
    if (this.objects) return this.objects;
    
    return this.objects = [];
  };
  
  return shore;
});