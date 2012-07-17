define(function(){
  return {
    getTile: function(tile, callback){
      var testTileSet = [];
      
      testTileSet[246] = [];
      testTileSet[246][1026] = {type: 'road'};
      
      var x = tile.getPosition().getX();
      var y = tile.getPosition().getY();
      
      if(testTileSet[x] && testTileSet[x][y]){
        callback(testTileSet[x][y]);
      }
    }
  };
});