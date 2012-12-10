define(['./sprites/outworldTileSprite'], function (OutworldTileSprite) {
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

    Scene.prototype.getTiles = function () {
        var at = [this.at.x | 0, this.at.y | 0],
            atX = at[0],
            atY = at[1],
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
            for (x = atX - level; x <= atX + level; x++) {
                for (y = atY - level; y <= atY + level; y++) {
                    if (x > atX - level && x < atX + level && y > atY - level && y < atY + level) continue; //skiping tileModels of previous levels

                    tile = tiles.getTile(x, y);

                    //if no tile, e.g. it's outside world border, draw dummy water tile
                    if (tile) {
                        sprite = sprites.createSpriteFor(tile);
                        sprite.setOriginOffset(this.coordinatesTransform(x, y, tile.position.z));
                    } else {
                        sprite = new OutworldTileSprite(sprites);
                        sprite.setOriginOffset(this.coordinatesTransform(x, y, tiles.world.waterLevel));
                    }

                    offset = sprite.getOffset();

                    //check rect intersection of tile image and window
                    if (offset[0] > size[0] || offset[0] < -sprite.size[0] || offset[1] > size[1] || offset[1] < -sprite.size[1]) continue;

                    visibleTilePositions[count] = tile.position;
                    visibleTileSprites[count] = sprite;
                    count++;
                    end = false;
                }
            }
        }

        return visibleTileSprites;
    };

    Scene.prototype.getObjects = function () {
        var tilePositions = this.visibleTilePositions,
            objects = this.world.objects,
            sprites = this.viewport.sprites,
            visibleObjects = [],
            position, i, j, tileObjects, object, pos, sprite, count = 0;

        for (i = 0; position = tilePositions[i]; i++) {
            tileObjects = objects.getObjectsInTile(position.getX(), position.getY());
            for (j = 0; object = tileObjects[j]; j++) {
                pos = object.getPosition();

                sprite = sprites.createSpriteFor(object);
                sprite.setOriginOffset(this.coordinatesTransform(pos.getX(), pos.getY(), pos.getZ()));

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

    Scene.prototype.coordinatesTransform = function (x, y, z) { //TODO should accept pos vect, and output array;
        //console.log(this.containerElement.id);
        var gridSpacing = this.grid.spacing,
            angle = Math.PI / -4,
            cosValue = Math.cos(angle),
            sinValue = Math.sin(angle);

        x = (x - this.at.x) * gridSpacing[0];
        y = (y - this.at.y) * gridSpacing[1];
        z *= gridSpacing[2];

        return [
            1 + x * cosValue - y * sinValue + this.size[0] / 2,
            1 - ( x * sinValue + y * cosValue - this.size[1] ) / 2 - z
        ];
    };

    return Scene;
});