define(['tiles/tile'], function(tile){
  return {
    tiles: [],
    hash: [],
    init: function(){
      //this.t = new Date().getTime();
    },
    update: function(){
//      var now = new Date().getTime();
//      if(now - this.t < 100) return;
//      this.t = now;
      //console.log('Logic updated.');
      
      //update tiles in some radius around player, cause we can't update whole world.
      var playerPos = g.logic.player.getPosition().getCoordinates();
      
      var radius = 40, a = Math.floor(playerPos.x - radius), b = Math.floor(playerPos.x + radius), c = Math.floor(playerPos.y - radius), d = Math.floor(playerPos.y + radius); 
      
      for(var x = a; x < b; x++){
        for(var y = c; y < d; y++){
          this.getTile(x, y).update();
        }
      }
    },
    getTile: function(x, y){
      if (this.hash[x] && this.hash[x][y]) return this.hash[x][y];
      if (!this.hash[x]) this.hash[x] = [];
      
      var t = this.hash[x][y] = Object.create(tile).init(x, y);
      
      this.tiles.push(t);
		
      //delete old tile
      if (this.tiles.length > 128000000){ //12800 = (radius*2)^2*2
        //deleting references
        var deleteTile = this.tiles.shift();
        delete this.hash[deleteTile.getX()][deleteTile.getY()];
      }
		
      return t;
    }
  }
});