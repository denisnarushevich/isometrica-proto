define(['./tiles/shore', './tiles/land', './tiles/water'], function (Shore, Land, Water) {

    var Tiles = function (world) {
        this.world = world;
        this.XYToIdMap = [];
        this.idMap = [];
        this.cacheList = [];
    };

    Tiles.prototype.world = null;
    Tiles.prototype.XYToIdMap = null;
    Tiles.prototype.idMap = null;
    Tiles.prototype.lastId = 0;
    Tiles.prototype.cacheList = null;

    Tiles.prototype.update = function () {
        var radius = 40,
            playerPosition = this.world.player.getPosition(),
            x0 = Math.floor(playerPosition.getX() - radius),
            x1 = Math.floor(playerPosition.getX() + radius),
            y0 = Math.floor(playerPosition.getY() - radius),
            y1 = Math.floor(playerPosition.getY() + radius);

        for (var x = x0; x < x1; x++)
            for (var y = y0; y < y1; y++)
                this.getTile(x, y).update();
    };

    Tiles.prototype.getTile = function (x, y) {
        var id, cachedTile, XYToIdMap = this.XYToIdMap;

        //look up for id, for cached tile and return it if success.
        if (XYToIdMap[x] && (id = XYToIdMap[x][y]) && (cachedTile = this.idMap[id])) return cachedTile;

        //...otherwise create new tile...

        //gridpoints start count from tileModels left (West corner) and goes clockwise;
        var tile, waterLevel = this.world.getWaterLevel(), grid = this.world.grid, gridPoints = [
            grid.getPoint(x, y),
            grid.getPoint(x, y + 1),
            grid.getPoint(x + 1, y + 1),
            grid.getPoint(x + 1, y)
        ];

        if (gridPoints[0].getZ() <= waterLevel && gridPoints[1].getZ() <= waterLevel && gridPoints[2].getZ() <= waterLevel && gridPoints[3].getZ() <= waterLevel)
            tile = new Water(this, gridPoints);
        else if (gridPoints[0].getZ() <= waterLevel || gridPoints[1].getZ() <= waterLevel || gridPoints[2].getZ() <= waterLevel || gridPoints[3].getZ() <= waterLevel)
            tile = new Shore(this, gridPoints);
        else
            tile = new Land(this, gridPoints);

        if (!id) {
            if (!XYToIdMap[x])
                XYToIdMap[x] = [];

            id = XYToIdMap[x][y] = this.lastId++;
        }

        tile.setId(id);
        this.idMap[id] = tile;
        this.cacheList.push(id);

        if (this.cacheList.length > 20000) {
            delete this.idMap[this.cacheList.shift()];
        }

        return tile;
    };

    Tiles.prototype.getTileById = function (id) {
        var tile;
        if (tile = this.idMap[id])return tile;
        return false;
    };

    return Tiles;


    return {
        tiles:[],
        hash:[],
        roads:[],
        init:function () {

        },
        update:function () {
            //      var now = new Date().getTime();
            //      if(now - this.t < 100) return;
            //      this.t = now;
            //console.log('Logic updated.');

            //update tileModels in some radius around player, cause we can't update whole world.
            var playerPos = player.getPosition();

            var radius = 50, a = Math.floor(playerPos.getX() - radius), b = Math.floor(playerPos.getX() + radius), c = Math.floor(playerPos.getY() - radius), d = Math.floor(playerPos.getY() + radius);

            for (var x = a; x < b; x++) {
                for (var y = c; y < d; y++) {
                    this.getTile(x, y).update();
                }
            }
        },
        getTile:function (x, y) {
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

            if (gridPoints[0].getW() && gridPoints[1].getW() && gridPoints[2].getW() && gridPoints[3].getW()) {
                t = new water(gridPoints, this);
            } else if (gridPoints[0].getW() || gridPoints[1].getW() || gridPoints[2].getW() || gridPoints[3].getW()) {
                t = new shore(gridPoints, this);
            } else if (this.testTileSet[x] && this.testTileSet[x][y]) {
                t = new road(gridPoints, this);
                this.roads.push(t);
            } else {
                t = new land(gridPoints, this);
            }
            this.tiles.push(this.hash[x][y] = t);

            //    remote.getTile(t, function(tile){
            //      if( tile.type == 'road' ) ;
            //
            //    });

            //delete old tile
            if (this.tiles.length > 20000) { //20000 = (radius*2)^2*2
                this.deleteTile(this.tiles.shift());
            }

            return t;
        },
        deleteTile:function (tile) {
            delete this.hash[tile.getPosition().getX()][tile.getPosition().getY()];
        }
        //    replaceTile: function(tile1, tile2){
        //      if ( tile1.getPosition() != tile2.getPosition() ) return false;
        //      this.deleteTile(tile1);
        //      return this.tileModels[tile2.getPosition().getX()][tile2.getPosition().getY()] = tile2;
        //    }
    }
});