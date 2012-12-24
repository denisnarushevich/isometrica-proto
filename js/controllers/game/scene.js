define(['./sprites/outworldTileSprite', './config'], function (OutworldTileSprite, config) {
        function Scene(viewport, at) {
            this.at = at;
            this.viewport = viewport;
            this.world = this.viewport.graphics.logic.world;
            this.visibleTilePositions = new Array();
            this.grid = this.world.grid;
        }

        ;

        var p = Scene.prototype;

        Scene.prototype.world = null;
        Scene.prototype.grid = null;
        Scene.prototype.viewport = null;
        Scene.prototype.at = null;
        Scene.prototype.visibleTilePositions = null;

        Scene.prototype.getTilesOLD = function () {
            var at = [this.at.x | 0, this.at.y | 0],
                atX = at[0],
                atY = at[1],
                leni, lenj,
                tiles = this.world.tiles,
                size = this.viewport.size,
                visibleTilePositions = this.visibleTilePositions = [],
                sprites = this.viewport.sprites,
                tile, sprite, offset,
                visibleTileSprites = [],
                count = 0,
                x, y;

            //from "at" tile in center of the screen loop is going level by level
            //increasing XxY area of tileModels.
            //tileModels outside of the screen are not drawn.
            //loop exits when there was no new tileModels for last level.
            for (var end, level = 0; !end; level++) {
                end = true;
                for (x = atX - level, leni = atX + level; x <= leni; x++) {
                    for (y = atY - level, lenj = atY + level; y <= lenj; y++) {
                        if (x > atX - level && x < atX + level && y > atY - level && y < atY + level) continue; //skiping tileModels of previous levels

                        tile = tiles.getTile(x, y);

                        //if no tile, e.g. it's outside world border, draw dummy water tile
                        if (tile) {
                            sprite = sprites.createSpriteFor(tile);
                            var a = [];
                            sprite.setOriginOffset(this.coordinatesTransform(tile.position, a));
                        } else {
                            sprite = new OutworldTileSprite(sprites);
                            sprite.setOriginOffset(this.coordinatesTransform(x, y, tiles.world.waterLevel));
                        }

                        offset = sprite.getOffset();

                        //check rect intersection of tile image and window
                        if (offset[0] > size[0] || offset[0] < -sprite.size[0] || offset[1] > size[1] || offset[1] < -sprite.size[1]) continue;

                        if (tile)
                            visibleTilePositions[count] = tile.position;
                        visibleTileSprites[count] = sprite;
                        count++;
                        end = false;
                    }
                }
            }

            return visibleTileSprites;
        };

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
                    x = x1 - j;
                    y = y1 + j;

                    tile = tiles.getTile(x, y);

                    //if no tile, e.g. it's outside world border, draw dummy water tile
                    if (tile) {
                        sprite = sprites.createSpriteFor(tile);
                        sprite.setOriginOffset(this.coordinatesTransform(tile.position, []));
                        visibleTilePositions[count] = tile.position;
                    } else {
                        sprite = new OutworldTileSprite(sprites);
                        sprite.setOriginOffset(this.coordinatesTransform(x, y, tiles.world.waterLevel));
                    }

                    visibleTileSprites[count++] = sprite;

                    offset = sprite.getOffset();

                    //check rect vertical intersection of tile image and window
                    if (offset[1] > viewportSize[1] || offset[1] < -sprite.size[1])
                        break;
                }

                //tiles below x0,y0
                for (j = 1; ; j++) { // j = 1, because 0 is already drawn by upper part's loop
                    x = x1 + j;
                    y = y1 - j;

                    tile = tiles.getTile(x, y);

                    //if no tile, e.g. it's outside world border, draw dummy water tile
                    if (tile) {
                        sprite = sprites.createSpriteFor(tile);
                        sprite.setOriginOffset(this.coordinatesTransform(tile.position, []));
                        visibleTilePositions[count] = tile.position;
                    } else {
                        sprite = new OutworldTileSprite(sprites);
                        sprite.setOriginOffset(this.coordinatesTransform(x, y, tiles.world.waterLevel));
                    }

                    visibleTileSprites[count++] = sprite;

                    offset = sprite.getOffset();

                    //check rect vertical intersection of tile image and window
                    if (offset[1] > viewportSize[1] || offset[1] < -sprite.size[1])
                        break;
                }
            }

            return visibleTileSprites;
        }
        ;

        Scene.prototype.getObjects = function () {
            var tilePositions = this.visibleTilePositions,
                objects = this.world.objects,
                sprites = this.viewport.sprites,
                visibleObjects = [],
                position, i, j, tileObjects, object, pos, sprite, leni, lenj, count = 0;

            for (i = 0, leni = tilePositions.length; i < leni; i++) {
                position = tilePositions[i];
                tileObjects = objects.getObjectsInTile(position.x, position.y);

                for (j = 0, lenj = tileObjects.length; j < lenj; j++) {
                    object = tileObjects[j];
                    pos = object.getPosition();

                    sprite = sprites.createSpriteFor(object);
                    sprite.setOriginOffset(this.coordinatesTransform(pos, []));

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

        Scene.prototype.coordinatesTransform = function (vector3, returnArray) {
            //console.log(this.containerElement.id);
            var gridSpacing = this.grid.spacing,
                angle = Math.PI / -4,
                cosValue = Math.cos(angle),
                sinValue = Math.sin(angle);

            x = (vector3.x - this.at.x) * gridSpacing[0];
            y = (vector3.y - this.at.y) * gridSpacing[1];
            z = vector3.z * gridSpacing[2];

            //return [1 + x * cosValue - y * sinValue + this.size[0] / 2,1 - ( x * sinValue + y * cosValue - this.size[1] ) / 2 - z];

            returnArray[0] = 1 + x * cosValue - y * sinValue + this.size[0] / 2;
            returnArray[1] = 1 - ( x * sinValue + y * cosValue - this.size[1] ) / 2 - z;

            return returnArray;
        };

        return Scene;
    }
)
;