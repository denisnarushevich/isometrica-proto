define(['./tile'], function(Tile){

    var Tiles = new function(world){
        this.world = world;
        this.tiles = new Array();
    };

    Tiles.prototype.world = null;
    Tiles.prototype.tilesArray = null;
    Tiles.prototype.tilesStack = null;

    Tiles.prototype.update = function(){
        var radius = 50,
            playerPosition = this.world.player.getPosition(),
            x0 = Math.floor(playerPosition.getX() - radius),
            x1 = Math.floor(playerPosition.getX() + radius),
            y0 = Math.floor(playerPosition.getY() - radius),
            y1 = Math.floor(playerPosition.getY() + radius);

        for(var x = x0; x < x1; x++){
            for(var y = y0; y < y1; y++){
                this.getTile(x, y).update();
            }
        }
    };

    Tiles.prototype.getTile = function(x, y){
        //look up in cache, and return if is cached
        if (this.tilesArray[x] && this.tilesArray[x][y]) return this.tilesArray[x][y];

        //make sure that current X in array is array of Ys
        if (!this.hash[x]) this.hash[x] = [];

        var tile;
        this.tilesStack.push(this.tilesArray[x][y] = tile = new Tile(tiles, x, y));

        //fifo
        if(this.tilesStack.length > 20000){
            var tileOld = this.tilesStack.shift();
            var position = tileOld.getPosition();
            delete this.tilesArray[position.getX()][position.getY()];
        }

        return tile;
    };

    return Tiles;








    return {
       tiles: [],
      hash: [],
      roads: [],
      init: function(){

      },
      update: function(){
        //      var now = new Date().getTime();
        //      if(now - this.t < 100) return;
        //      this.t = now;
        //console.log('Logic updated.');
      
        //update tileModels in some radius around player, cause we can't update whole world.
        var playerPos = player.getPosition();
      
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
        if (!this.hash[x]) this.hash[x] = [];
      
        //get type of requested tile
        //var grid = g.logic.world.grid;
    
        //gridpoints start count from tileModels left (West corner);
        var gridPoints = [ 
        grid.getPoint(x, y),
        grid.getPoint(x, y + 1),
        grid.getPoint(x + 1, y + 1),
        grid.getPoint(x + 1, y)
        ];
    
        var t;
    
        if(gridPoints[0].getW() && gridPoints[1].getW() && gridPoints[2].getW() && gridPoints[3].getW()){
          t = new water(gridPoints, this);
        }else if(gridPoints[0].getW() || gridPoints[1].getW() || gridPoints[2].getW() || gridPoints[3].getW()){
          t = new shore(gridPoints, this);
        }else if( this.testTileSet[x] && this.testTileSet[x][y]){
          t = new road(gridPoints, this);
          this.roads.push(t);
        }else{
          t = new land(gridPoints, this);
        }
        this.tiles.push(this.hash[x][y] = t);
		
        //    remote.getTile(t, function(tile){
        //      if( tile.type == 'road' ) ;
        //      
        //    });
    
        //delete old tile
        if (this.tiles.length > 20000){ //20000 = (radius*2)^2*2
          this.deleteTile(this.tiles.shift());
        }
		
        return t;
      },
      deleteTile: function(tile){
        delete this.hash[tile.getPosition().getX()][tile.getPosition().getY()];
      }
    //    replaceTile: function(tile1, tile2){
    //      if ( tile1.getPosition() != tile2.getPosition() ) return false;
    //      this.deleteTile(tile1);
    //      return this.tileModels[tile2.getPosition().getX()][tile2.getPosition().getY()] = tile2;
    //    }
    }
  });