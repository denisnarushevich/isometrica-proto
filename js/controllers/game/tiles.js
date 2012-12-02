define(['./tiles/shoreTile', './tiles/landTile', './tiles/waterTile'], function (Shore, Land, Water) {

    var Tiles = function (world) {
        this.world = world;
        this.tilesDictionary = new Array(world.getSize().getX() * world.getSize().getY());
        this.worldSizeY = world.getSize().getY();
    };

    Tiles.prototype.world = null;
    Tiles.prototype.worldSizeY = null;
    Tiles.prototype.tilesDictionary = null;

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

    Tiles.prototype.getTileOld = function (x, y) {
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

    Tiles.prototype.getTile = function (x, y) {
        var tiles = this.tilesDictionary,
            id = x * this.worldSizeY + y,
            tile = tiles[id];

        if(tile)return tile;

        //...otherwise create new tile...

        //gridpoints start count from tileModels left (West corner) and goes clockwise;
        var waterLevel = this.world.getWaterLevel(), grid = this.world.grid, gridPoints = [
            grid.getPoint(x, y),
            grid.getPoint(x, y + 1),
            grid.getPoint(x + 1, y + 1),
            grid.getPoint(x + 1, y)
            ],
            z0 = gridPoints[0].getZ(),
            z1 = gridPoints[1].getZ(),
            z2 = gridPoints[2].getZ(),
            z3 = gridPoints[3].getZ();

        if (z0 <= waterLevel && z1 <= waterLevel && z2 <= waterLevel && z3 <= waterLevel)
            tile = new Water(this, gridPoints);
        else if (z0 <= waterLevel || gridPoints[1].getZ() <= waterLevel || z2 <= waterLevel || z3 <= waterLevel)
            tile = new Shore(this, gridPoints);
        else
            tile = new Land(this, gridPoints);

        tile.setId(id);
        tile.globalId = this.world.lastGlobalId++;
        return tiles[id] = tile;
    };

    Tiles.prototype.getTileByIdOld = function (id) {
        var tile;
        if (tile = this.idMap[id])return tile;
        return false;
    };

    Tiles.prototype.getTileById = function (id) {
        var tile;
        if (tile = this.tilesDictionary[id])return tile;
        return false;
    };

    return Tiles;
});