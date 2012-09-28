define([
  './tiles/land',
  './tiles/road',
  './tiles/shore',
  './tiles/water',
  './grid',
  './player'
  ], function(land, road, shore, water, grid, player){

    return {
       tiles: [],
      hash: [],
      roads: [],
      init: function(){
        //this.t = new Date().getTime();
    
        this.testTileSet = [];
      
        this.testTileSet[246] = [];
        this.testTileSet[246][1029] = {
          type: 'road'
        };
        this.testTileSet[246][1028] = {
          type: 'road'
        };
        this.testTileSet[246][1027] = {
          type: 'road'
        };
        this.testTileSet[246][1026] = {
          type: 'road'
        };
        this.testTileSet[246][1025] = {
          type: 'road'
        };
        this.testTileSet[246][1024] = {
          type: 'road'
        };
        this.testTileSet[246][1023] = {
          type: 'road'
        };
        this.testTileSet[247] = [];
        this.testTileSet[247][1039] = {
          type: 'road'
        };
        this.testTileSet[247][1038] = {
          type: 'road'
        };
        this.testTileSet[247][1037] = {
          type: 'road'
        };
        this.testTileSet[247][1036] = {
          type: 'road'
        };
        this.testTileSet[247][1035] = {
          type: 'road'
        };
        this.testTileSet[247][1034] = {
          type: 'road'
        };
        this.testTileSet[247][1033] = {
          type: 'road'
        };
        this.testTileSet[247][1032] = {
          type: 'road'
        };
        this.testTileSet[247][1031] = {
          type: 'road'
        };
        this.testTileSet[247][1030] = {
          type: 'road'
        };
        this.testTileSet[247][1029] = {
          type: 'road'
        };
        this.testTileSet[247][1023] = {
          type: 'road'
        };
        this.testTileSet[247][1026] = {
          type: 'road'
        };
        this.testTileSet[248] = [];
        this.testTileSet[248][1030] = {
          type: 'road'
        };
        this.testTileSet[248][1029] = {
          type: 'road'
        };
        this.testTileSet[248][1028] = {
          type: 'road'
        };
        this.testTileSet[248][1027] = {
          type: 'road'
        };
        this.testTileSet[248][1026] = {
          type: 'road'
        };
        this.testTileSet[248][1025] = {
          type: 'road'
        };
        this.testTileSet[248][1024] = {
          type: 'road'
        };
        this.testTileSet[248][1023] = {
          type: 'road'
        };
        this.testTileSet[248][1022] = {
          type: 'road'
        };
        this.testTileSet[248][1021] = {
          type: 'road'
        };
        this.testTileSet[248][1020] = {
          type: 'road'
        };
        this.testTileSet[248][1019] = {
          type: 'road'
        };
        this.testTileSet[248][1018] = {
          type: 'road'
        };
        this.testTileSet[248][1017] = {
          type: 'road'
        };
        this.testTileSet[248][1016] = {
          type: 'road'
        };
        this.testTileSet[248][1015] = {
          type: 'road'
        };
        this.testTileSet[248][1014] = {
          type: 'road'
        };
        this.testTileSet[248][1013] = {
          type: 'road'
        };
        this.testTileSet[248][1012] = {
          type: 'road'
        };
        this.testTileSet[248][1011] = {
          type: 'road'
        };
        this.testTileSet[248][1010] = {
          type: 'road'
        };
        this.testTileSet[248][1009] = {
          type: 'road'
        };
        this.testTileSet[248][1008] = {
          type: 'road'
        };
        this.testTileSet[248][1007] = {
          type: 'road'
        };
        this.testTileSet[248][1006] = {
          type: 'road'
        };
        this.testTileSet[248][1005] = {
          type: 'road'
        };
        this.testTileSet[248][1004] = {
          type: 'road'
        };
        this.testTileSet[248][1003] = {
          type: 'road'
        };
        this.testTileSet[248][1002] = {
          type: 'road'
        };
        this.testTileSet[248][1001] = {
          type: 'road'
        };
        this.testTileSet[248][1000] = {
          type: 'road'
        };
        this.testTileSet[249] = [];
        this.testTileSet[249][1029] = {
          type: 'road'
        };
        this.testTileSet[249][1023] = {
          type: 'road'
        };
        this.testTileSet[249][1026] = {
          type: 'road'
        };
        this.testTileSet[249][1020] = {
          type: 'road'
        };
        this.testTileSet[250] = [];
        this.testTileSet[250][1029] = {
          type: 'road'
        };
        this.testTileSet[250][1028] = {
          type: 'road'
        };
        this.testTileSet[250][1027] = {
          type: 'road'
        };
        this.testTileSet[250][1026] = {
          type: 'road'
        };
        this.testTileSet[250][1025] = {
          type: 'road'
        };
        this.testTileSet[250][1024] = {
          type: 'road'
        };
        this.testTileSet[250][1023] = {
          type: 'road'
        };
        this.testTileSet[250][1020] = {
          type: 'road'
        };
      
        this.testTileSet[251] = [];
        this.testTileSet[251][1029] = {
          type: 'road'
        };
        this.testTileSet[251][1026] = {
          type: 'road'
        };
        this.testTileSet[251][1023] = {
          type: 'road'
        };
        this.testTileSet[251][1020] = {
          type: 'road'
        };
        this.testTileSet[252] = [];
        this.testTileSet[252][1029] = {
          type: 'road'
        };
        this.testTileSet[252][1026] = {
          type: 'road'
        };
        this.testTileSet[252][1023] = {
          type: 'road'
        };
        this.testTileSet[252][1020] = {
          type: 'road'
        };
        this.testTileSet[253] = [];
        this.testTileSet[253][1029] = {
          type: 'road'
        };
        this.testTileSet[253][1026] = {
          type: 'road'
        };
        this.testTileSet[253][1023] = {
          type: 'road'
        };
        this.testTileSet[253][1020] = {
          type: 'road'
        };
        this.testTileSet[254] = [];
        this.testTileSet[254][1029] = {
          type: 'road'
        };
        this.testTileSet[254][1026] = {
          type: 'road'
        };
        this.testTileSet[254][1023] = {
          type: 'road'
        };
        this.testTileSet[254][1020] = {
          type: 'road'
        };
        this.testTileSet[255] = [];
        this.testTileSet[255][1029] = {
          type: 'road'
        };
        this.testTileSet[255][1026] = {
          type: 'road'
        };
        this.testTileSet[255][1023] = {
          type: 'road'
        };
        this.testTileSet[255][1020] = {
          type: 'road'
        };
        this.testTileSet[256] = [];
        this.testTileSet[256][1029] = {
          type: 'road'
        };
        this.testTileSet[256][1028] = {
          type: 'road'
        };
        this.testTileSet[256][1027] = {
          type: 'road'
        };
        this.testTileSet[256][1026] = {
          type: 'road'
        };
        this.testTileSet[256][1025] = {
          type: 'road'
        };
        this.testTileSet[256][1024] = {
          type: 'road'
        };
        this.testTileSet[256][1023] = {
          type: 'road'
        };
        this.testTileSet[256][1022] = {
          type: 'road'
        };
        this.testTileSet[256][1021] = {
          type: 'road'
        };
        this.testTileSet[256][1020] = {
          type: 'road'
        };
        this.testTileSet[257] = [];
        this.testTileSet[257][1029] = {
          type: 'road'
        };
        this.testTileSet[257][1024] = {
          type: 'road'
        };
        this.testTileSet[257][1020] = {
          type: 'road'
        };
        this.testTileSet[258] = [];
        this.testTileSet[258][1029] = {
          type: 'road'
        };
        this.testTileSet[258][1024] = {
          type: 'road'
        };
        this.testTileSet[258][1025] = {
          type: 'road'
        };
        this.testTileSet[258][1020] = {
          type: 'road'
        };
        this.testTileSet[259] = [];
        this.testTileSet[259][1029] = {
          type: 'road'
        };
        this.testTileSet[259][1025] = {
          type: 'road'
        };
        this.testTileSet[259][1020] = {
          type: 'road'
        };
        this.testTileSet[260] = [];
        this.testTileSet[260][1029] = {
          type: 'road'
        };
        this.testTileSet[260][1025] = {
          type: 'road'
        };
        this.testTileSet[260][1020] = {
          type: 'road'
        };
        this.testTileSet[261] = [];
        this.testTileSet[261][1029] = {
          type: 'road'
        };
        this.testTileSet[261][1025] = {
          type: 'road'
        };
        this.testTileSet[261][1020] = {
          type: 'road'
        };
        this.testTileSet[262] = [];
        this.testTileSet[262][1029] = {
          type: 'road'
        };
        this.testTileSet[262][1028] = {
          type: 'road'
        };
        this.testTileSet[262][1027] = {
          type: 'road'
        };
        this.testTileSet[262][1026] = {
          type: 'road'
        };
        this.testTileSet[262][1025] = {
          type: 'road'
        };
        this.testTileSet[262][1024] = {
          type: 'road'
        };
        this.testTileSet[262][1023] = {
          type: 'road'
        };
        this.testTileSet[262][1022] = {
          type: 'road'
        };
        this.testTileSet[262][1021] = {
          type: 'road'
        };
        this.testTileSet[262][1020] = {
          type: 'road'
        };
      },
      update: function(){
        //      var now = new Date().getTime();
        //      if(now - this.t < 100) return;
        //      this.t = now;
        //console.log('Logic updated.');
      
        //update tiles in some radius around player, cause we can't update whole world.
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
    
        //gridpoints start count from tiles left (West corner);
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
    //      return this.tiles[tile2.getPosition().getX()][tile2.getPosition().getY()] = tile2;
    //    }
    }
  });