define(['./tiles/tile'], function (Tile) {

    var Tiles = function (world) {
        this.world = world;
        this.tilesDictionary = new Array(world.size.x * world.size.y);
        this.worldSizeY = world.size.y;
    };

    var p = Tiles.prototype;

    p.world = null;
    p.worldSizeY = null;
    p.tilesDictionary = null;

    Tiles.prototype.update = function () {
        var radius = 40,
            playerPosition = this.world.player.position,
            x0 = Math.floor(playerPosition.x - radius),
            x1 = Math.floor(playerPosition.x + radius),
            y0 = Math.floor(playerPosition.y - radius),
            y1 = Math.floor(playerPosition.y + radius),
            tile;

        for (var x = x0; x < x1; x++)
            for (var y = y0; y < y1; y++)
                if(tile = this.getTile(x, y))
                    tile.update();
    };

    Tiles.prototype.getTile = function (x, y) {
        if(x < 0 || y < 0 || x > this.world.size.x || y > this.world.size.y)
         return false;

        var tiles = this.tilesDictionary,
            id = x * this.worldSizeY + y,
            tile = tiles[id];

        if (tile)return tile;

        //...otherwise create new tile...

        tile = new Tile(this, x, y);

        tile.id = id;
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