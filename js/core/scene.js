define(function () {
    function Scene(viewport, at) {
        this.at = at;
        this.viewport = viewport;
        this.world = this.viewport.graphics.logic.world;
        this.visibleTilePositions = [];
        this.grid = this.world.grid;
    }

    ;

    Scene.prototype.world = null;
    Scene.prototype.grid = null;
    Scene.prototype.viewport = null;
    Scene.prototype.at = null;
    Scene.prototype.visibleTilePositions = null;

    Scene.prototype.getTiles = function () {
        var at = [this.at.getX() | 0, this.at.getY() | 0],
            tiles = this.world.tiles,
            size = this.viewport.size,
            visibleTilePositions = this.visibleTilePositions = [],
            sprites = this.viewport.sprites,
            tile, sprite, offset,
            visibleTileSprites = [],
            x, y;

        //from "at" tile in center of the screen loop is going level by level
        //increasing XxY area of tileModels.
        //tileModels outside of the screen are not drawn.
        //loop exits when there was no new tileModels for last level.
        for (var end, level = 0; !end; level++) {
            end = true;
            for (x = at[0] - level; x <= at[0] + level; x++) {
                for (y = at[1] - level; y <= at[1] + level; y++) {
                    if (x > at[0] - level && x < at[0] + level && y > at[1] - level && y < at[1] + level) continue; //skiping tileModels of previous levels

                    tile = tiles.getTile(x, y);

                    //if(!tile) continue;

                    sprite = sprites.createSpriteFor(tile);
                    sprite.setOriginOffset(this.coordinatesTransform(x, y, tile.getPosition().getZ()));
                    offset = sprite.getOffset();

                    //check rect intersection of tile image and window
                    if (offset[0] > size[0] || offset[0] < -sprite.size[0] || offset[1] > size[1] || offset[1] < -sprite.size[1]) continue;

                    visibleTilePositions.push(tile.getPosition());
                    visibleTileSprites.push(sprite);
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
            position, i, j, tileObjects, object, pos, sprite;

        for (i = 0; position = tilePositions[i]; i++) {
            tileObjects = objects.getObjectsInTile(position.getX(), position.getY());
            for (j = 0; object = tileObjects[j]; j++) {
                pos = object.getPosition();

                sprite = sprites.createSpriteFor(object);
                sprite.setOriginOffset(this.coordinatesTransform(pos.getX(), pos.getY(), pos.getZ()));

                visibleObjects.push(sprite);
            }
        }
        ;

        //sorting by depth, where depth is y screen offset coordinate.
        visibleObjects.sort(function (obj1, obj2) {
            return obj1.getOriginOffset()[1] < obj2.getOriginOffset()[1] ? -1 : 1;
        });

        return visibleObjects;
    };

    Scene.prototype.setSize = function (size) {
        return this.size = size;
    };

    Scene.prototype.coordinatesTransform = function (x, y, z) {
        //console.log(this.containerElement.id);
        var gridSpacing = this.grid.spacing,
            angle = Math.PI / -4,
            cosValue = Math.cos(angle),
            sinValue = Math.sin(angle);

        x = (x - this.at.getX()) * gridSpacing[0];
        y = (y - this.at.getY()) * gridSpacing[1];
        z *= gridSpacing[2];

        return [
            1 + x * cosValue - y * sinValue + this.size[0] / 2,
            1 - ( x * sinValue + y * cosValue - this.size[1] ) / 2 - z
        ];
    };

    return Scene;
});