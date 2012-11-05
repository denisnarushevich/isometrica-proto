define(['./land'], function(Tile){
  var Shore = function(tiles, gridPoints){
    Tile.call(this, tiles, gridPoints);
    this.type = this._SHORE;
    this.typeName = 'shore';
    return this;
  }
  
  Shore.prototype = Object.create(Tile.prototype);

  Shore.prototype.plantTree = function(){
      return;
  }

  Shore.prototype.getObjects = function(){
    if (this.objects) return this.objects;
    
    return this.objects = [];
  };
  
  return Shore;
});