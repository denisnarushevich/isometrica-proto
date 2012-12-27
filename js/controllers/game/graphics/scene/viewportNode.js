define(['../../config', './tileNode'], function(config, TileNode){
    function ViewportNode (viewport){
        this.tiles = [];
        this.viewport = viewport;
    }

    var p = ViewportNode.prototype;

    p.tileNodes = null;
    p.viewport = null;

    p.fill = function () {
        var atX = this.viewport.position.x | 0,
            atY = this.viewport.position.y | 0,
            visibleTileNodes = [],
            count = 0,
            tiles = this.viewport.graphics.logic.world.tiles,
            viewportSize = this.viewport.size,
            rows, x0, y0, x1, y1, i, j, tile, screenOffset;

        rows = Math.ceil(this.viewport.size[0] / config.TILE_IMG_W); //half of number of all rows

        //coordinates of most left vertical row of tiles.
        x0 = atX - Math.ceil(rows / 2 + 1);
        y0 = atY - ((rows / 2 + 1) | 0);

        //get tiles for each row.
        for (i = 0, i1 = rows * 2 + 3; i < i1; i++) {

            //coordinates of center tile of row
            x1 = x0 + Math.ceil(i / 2);
            y1 = y0 + (i / 2) | 0;

            //get tiles over x0,y0 of row
            for (j = 0; ; j++) {
                screenOffset = new Utils.Math.Vec2(0,0);
                tile = tiles.getTile(x1 - j, y1 + j);
                this.coordinatesTransform(tile.position, screenOffset);
                //check rect vertical intersection of tile image and window
                if (screenOffset.y > viewportSize[1] || screenOffset.y + config.TILE_IMG_H < 0)
                    break;

                visibleTileNodes[count++] = new TileNode(tile);
            }

            //tiles below x0,y0
            for (j = 1; ; j++) { // j = 1, because 0 is already drawn by upper part's loop
                screenOffset = new Utils.Math.Vec2(0,0);
                tile = tiles.getTile(x1 + j, y1 - j);
                this.coordinatesTransform(tile.position, screenOffset);
                //check rect vertical intersection of tile image and window
                if (screenOffset.y > viewportSize[1] || screenOffset.y + config.TILE_IMG_H < 0)
                    break;

                visibleTileNodes[count++] = new TileNode(tile);
            }
        }

        return this.tileNodes = visibleTileNodes;
    }

    p.coordinatesTransform = function (vector3, vector2) {
        var angle = Math.PI / -4,
            cosValue = Math.cos(angle),
            sinValue = Math.sin(angle);

        x = (vector3.x - this.viewport.position.x) * config.TILE_W;
        y = (vector3.y - this.viewport.position.y) * config.TILE_L;
        z = vector3.z * config.TILE_H;

        vector2.x = 1 + x * cosValue - y * sinValue + this.viewport.size[0] / 2;
        vector2.y = 1 - ( x * sinValue + y * cosValue - this.viewport.size[1] ) / 2 - z;
    }

    return ViewportNode;
});