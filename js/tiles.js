define(['tile'], function(tile){
  return {
    tiles: [],
    hash: [],
    getTile: function(x, y){
      if (this.hash[x] && this.hash[x][y]) return this.hash[x][y];
      if (!this.hash[x]) this.hash[x] = [];
		
      var t = this.hash[x][y] = Object.create(tile).init(x, y);

      this.tiles.push(t);
		
      //delete old tile
      if (this.tiles.length > 10240){
        //deleting references
        var deleteTile = this.tiles.shift();
        delete this.hash[deleteTile.x][deleteTile.y];
      }
		
      return t;
    }
  }
});