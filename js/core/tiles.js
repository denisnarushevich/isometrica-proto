define(['./tiles/shoreTile', './tiles/landTile', './tiles/waterTile'], function (Shore, Land, Water) {

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
        tile.globalId = this.world.lastGlobalId++;
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
});