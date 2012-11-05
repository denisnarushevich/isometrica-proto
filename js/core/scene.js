define(function () {

    var Scene = function (viewportElement, at, graphics) {
        this.viewportElement = viewportElement;
        this.at = at;
        this.atStr = at.toString();
        this.updateSize();
        this.graphics = graphics;
    }

    Scene.prototype.detectVisibleGridPoints = function(){
        var gps = [];

        var at = new Int32Array([this.at.getX() | 0, this.at.getY() | 0]),
            grid = this.graphics.logic.world.grid;

        for (var end, level = 0; !end; level++) {
            end = true;
            for (var x = at[0] - level; x <= at[0] + level; x++) {
                for (var y = at[1] - level; y <= at[1] + level; y++) {
                    if (x > at[0] - level && x < at[0] + level && y > at[1] - level && y < at[1] + level) continue;

                    var offset = this.graphics.coordinatesTransform(x, y, grid.getPoint(x, y).getZ());

                    if (offset[0] > this.size[0] || offset[0] < 0 || offset[1] > this.size[1] || offset[1] < 0) continue;

                    gps.push(grid.getPoint(x, y));

                    end = false;
                }
            }
        }

        return gps;
    };

    Scene.prototype.detectVisibleGridPointss = function(){
        var gps = [];

        var at = new Int32Array([this.at.getX() | 0, this.at.getY() | 0]),
            grid = this.graphics.logic.world.grid;
        var k = 0;
        while(true){
            if(this.graphics.coordinatesTransform(at[0]-k, at[1]-k, 0)[0] < 0 && this.graphics.coordinatesTransform(at[0]+k, at[1]+k, 0)[0] > this.size[0])
                break;
            k++;
        }
        for(var i = at[0]-k; i <= at[0]+k; i++){
            for(var j = at[1]-k; j <= at[1]+k; j++){
                gps.push(grid.getPoint(i,j));
            }
        }
        return gps;
    };

    Scene.prototype.getTiles = function () {

        //if (this.atStr == this.at.toString() && this.tiles)return this.tiles; //if 'at' havent changed, then visible tileModels is same.
       //this.atStr = this.at.toString();
        this.tiles = [];

        var at = [Math.floor(this.at.getX()), Math.floor(this.at.getY())], tiles = this.graphics.logic.world.tiles;

        //from "at" tile in center of the screen loop is going level by level
        //increasing XxY area of tileModels.
        //tileModels outside of the screen are not drawn.
        //loop exits when there was no new tileModels for last level.
        for (var end, level = 0; !end; level++) {
            end = true;
            for (var x = at[0] - level; x <= at[0] + level; x++) {
                for (var y = at[1] - level; y <= at[1] + level; y++) {
                    if (x > at[0] - level && x < at[0] + level && y > at[1] - level && y < at[1] + level) continue; //skiping tileModels of previous levels

                    var sprite = this.graphics.sprites.getTileSprite(tiles.getTile(x, y));
                    sprite.update();
                    var offset = sprite.getOffset();

                    //check rect intersection of tile image and window
                    if (offset[0] > this.size[0] || offset[0] + sprite.size[0] < 0 || offset[1] > this.size[1] || offset[1] + sprite.size[1] < 0) continue;

                    this.tiles.push(sprite);
                    end = false;
                }
            }
        }

        return this.tiles;
    };

    Scene.prototype.getTiless = function(){
        this.tiles = [];
        var tiles = this.graphics.logic.world.tiles;
        var gps = this.detectVisibleGridPoints();
        for(var i = 0; gps[i]; i++){
            var x = gps[i].getX();
            var y = gps[i].getY();
            var sprite = this.graphics.sprites.getTileSprite(tiles.getTile(x, y));
            sprite.update();
            this.tiles.push(sprite);
        }

        return this.tiles;
    }

    Scene.prototype.getObjects = function () {
        this.objects = [];
        var tiles = this.tiles;
        var objects = this.graphics.logic.world.objects;

        for (var i = 0; tiles[i]; i++) {
            var tile = tiles[i].getModel();
            var tileObjects = objects.getObjectsInTile(tile.getPosition().getX(), tile.getPosition().getY());
            for (var j = 0; tileObjects[j]; j++) {
                var object = tileObjects[j];
                var pos = object.getPosition();

                var sprite = this.graphics.sprites.getObjectSprite(object);
                sprite.update();
                //console.log(sprite);throw 1;
                this.objects.push(sprite);
            }
        }
        ;

        //sorting by depth, where depth is y screen offset coordinate.
        this.objects.sort(function (obj1, obj2) {
            return obj1.getOriginOffset()[1] < obj2.getOriginOffset()[1] ? -1 : 1;
        });

        return this.objects;
    };

    Scene.prototype.updateSize = function () {
        this.tiles = null;
        this.size = [this.viewportElement.clientWidth, this.viewportElement.clientHeight];
    };



    return Scene;
});