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
      var playerPos = g.logic.player.getPosition();
      
      var radius = 50, a = Math.floor(playerPos.getX() - radius), b = Math.floor(playerPos.getX() + radius), c = Math.floor(playerPos.getY() - radius), d = Math.floor(playerPos.getY() + radius); 
      
      for(var x = a; x < b; x++){
        for(var y = c; y < d; y++){
          this.getTile(x, y).update();
        }
      }
    },
    getTile: function(x, y){
      //look up in cache, and return if already cached
      if (this.hash[x] && this.hash[x][y]) return this.hash[x][y];
      
      //get type of requested tile
    var grid = g.logic.world.grid;
    
    //gridpoints start count from tiles left (West corner);
    var gridPoints = [ 
      grid.getPoint(x, y),
      grid.getPoint(x, y + 1),
      grid.getPoint(x + 1, y + 1),
      grid.getPoint(x + 1, y)
    ];
    
    if(gridPoints[0].getW() && gridPoints[1].getW() && gridPoints[2].getW() && gridPoints[3].getW()){
      var a = water;
    }else if(gridPoints[0].getW() || gridPoints[1].getW() || gridPoints[2].getW() || gridPoints[3].getW()){
      var a = shore;
    }else if(false){
      var a = road;
    }else{
      var a = plain;
    }
      
      if (!this.hash[x]) this.hash[x] = [];
      
      
      
      var t = this.hash[x][y] = Object.create(a).init(gridPoints);
      
      this.tiles.push(t);
		
      //delete old tile
      if (this.tiles.length > 20000){ //20000 = (radius*2)^2*2
        //deleting references
        var deleteTile = this.tiles.shift();
        delete this.hash[deleteTile.getX()][deleteTile.getY()];
      }
		
      return t;
    }
  }
});