define(['./sprites/outworldTileSprite', './config'], function (OutworldTileSprite, config) {
        function Scene(viewport, at) {
            this.at = at;
            this.viewport = viewport;
            this.world = this.viewport.graphics.logic.world;
            this.visibleTilePositions = new Array();
            this.visibleTileSprites = [];
            this.grid = this.world.grid;
        }

        ;

        var p = Scene.prototype;

        Scene.prototype.world = null;
        Scene.prototype.grid = null;
        Scene.prototype.viewport = null;
        Scene.prototype.at = null;
        Scene.prototype.visibleTilePositions = null;

        Scene.prototype.getTiles = function () {

            var atX = this.at.x | 0,
                atY = this.at.y | 0,
                visibleTilePositions = this.visibleTilePositions = [],
                visibleTileSprites = [],
                count = 0,
                tiles = this.world.tiles,
                sprites = this.viewport.sprites,
                viewportSize = this.viewport.size,
                rows, x0, y0, i, j, x, y, tile, offset, sprite;

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
                    //up
                    tile = tiles.getTile(x1 - j, y1 + j);

                    //if no tile, e.g. it's outside world border, draw dummy water tile
                    if (tile) {
                        offset = new Utils.Math.Vec2(0, 0);
                        this.coordinatesTransform(tile.position, offset);

                        //check rect vertical intersection of tile image and window
                        if (offset.y > viewportSize[1] || offset.y < -config.TILE_IMG_H)
                            break;

                        sprite = sprites.createSpriteFor(tile);
                        sprite.setOriginOffset(offset);
                        visibleTilePositions[count] = tile.position;
                        visibleTileSprites[count++] = sprite;
                    }else{
                        break;
                    }
                }

                //tiles below x0,y0
                for (j = 1; ; j++) { // j = 1, because 0 is already drawn by upper part's loop
                    tile = tiles.getTile(x1 + j, y1 - j);

                    //if no tile, e.g. it's outside world border, draw dummy water tile
                    if (tile) {
                        offset = new Utils.Math.Vec2(0, 0);
                        this.coordinatesTransform(tile.position, offset);

                        //check rect vertical intersection of tile image and window
                        if (offset.y > viewportSize[1] || offset.y < -config.TILE_IMG_H)
                            break;

                        sprite = sprites.createSpriteFor(tile);
                        sprite.setOriginOffset(offset);
                        visibleTilePositions[count] = tile.position;
                        visibleTileSprites[count++] = sprite;
                    }else{
                        break;
                    }
                }
            }

            return this.visibleTileSprites = visibleTileSprites;
        }
        ;

        Scene.prototype.getObjects = function () {
            var tilePositions = this.visibleTilePositions,
                objects = this.world.objects,
                sprites = this.viewport.sprites,
                visibleObjects = [],
                position, i, j, tileObjects, object, pos, sprite, leni, lenj, count = 0, offset;

            for (i = 0, leni = tilePositions.length; i < leni; i++) {
                position = tilePositions[i];
                tileObjects = objects.getObjectsInTile(position.x, position.y);

                for (j = 0, lenj = tileObjects.length; j < lenj; j++) {
                    object = tileObjects[j];
                    pos = object.getPosition();

                    sprite = sprites.createSpriteFor(object);
                    offset = new Utils.Math.Vec2(0, 0);
                    this.coordinatesTransform(pos, offset);
                    sprite.setOriginOffset(offset);

                    visibleObjects[count++] = sprite;
                }
            }
            ;

            //sorting by depth, where depth is y screen offset coordinate.
            visibleObjects.sort(function (obj1, obj2) {
                return obj1.zIndex < obj2.zIndex ? -1 : 1;
            });

            return visibleObjects;
        };

        Scene.prototype.setSize = function (size) {
            return this.size = size;
        };

        Scene.prototype.coordinatesTransform = function (vector3, vector2) {
            var angle = Math.PI / -4,
                cosValue = Math.cos(angle),
                sinValue = Math.sin(angle);

            x = (vector3.x - this.at.x) * config.TILE_L;
            y = (vector3.y - this.at.y) * config.TILE_W;
            z = vector3.z * config.TILE_H;

            vector2.x = 1 + x * cosValue - y * sinValue + this.size[0] / 2;
            vector2.y = 1 - ( x * sinValue + y * cosValue - this.size[1] ) / 2 - z;
        };

        return Scene;
    }
)
;