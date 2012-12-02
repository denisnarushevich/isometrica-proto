define(function(){
  var storage = {};
  
  storage.tiles = [];
  
  storage.getTile = function(x, y, callback){
    if(this.tiles[x] && this.tiles[x][y])
      setTimeout(function(){
        callback(storage.tiles[x][y]);
      },10);
  };

  storage.setTile = function(tile){
    this.tiles[tile.getPosition().getX()][tile.getPosition().getY()];
    return this;
  }
});

