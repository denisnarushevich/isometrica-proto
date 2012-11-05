define(['./tile'], function (Tile) {
    var Land = function (tiles, gridPoints) {
        Tile.call(this, tiles, gridPoints); //calling parent constructor
        this.type = this._LAND;
        this.typeName = 'land';
        this.plantTree();
    }

    Land.prototype = Object.create(Tile.prototype);

    Land.prototype.plantTree = function () {
        var world = this.tiles.world, pos = this.getPosition(), x = pos.getX(), y = pos.getY();
        if (world.forestDistribution(x, y) > 0) {
            var d = world.forestDistribution(x * 2, y * 2);
            var tree = ['tree1', 'tree6'][Math.ceil(d)];
            var posX = x + 1/2 + world.forestDistribution(y / 2, x / 2) / 4;
            var posY = y + 1/2 + world.forestDistribution(x / 2, y / 2) / 4;
            this.tiles.world.objects.createObject(tree, posX, posY);
            //this.tiles.world.objects.createObject(tree, x + Math.abs(d), posY + Math.abs(d));
        }
        return;
    }

    Land.prototype.getTerrain = function () {
        if (this.terrain) return this.terrain;

        return this.terrain = 'grass';
        /*else{
         var sand = 0, x = this.x, y = this.y;

         sand += Simplex.noise2d(x / 512, y / 512) / 2;
         sand += Simplex.noise2d(x / 256, y / 256) / 4;
         sand += Simplex.noise2d(x / 128, y / 128) / 8;
         sand += Simplex.noise2d(x / 64, y / 64) / 16;
         sand += Simplex.noise2d(x / 32, y / 32) / 32;
         sand += Simplex.noise2d(x / 16, y / 16) / 32;

         sand *= Simplex.noise2d(x / 4096, y/ 4096);

         if (sand > 0.1) return this.terrain = 'sand';
         else if(sand <= 0.1 && sand > 0.09) return this.terrain = 'oldgrass';
         else{
         var oldgrass = 0, x = -this.x, y = -this.y;

         oldgrass += Simplex.noise2d(x / 32, y / 32) / 2;
         oldgrass += Simplex.noise2d(x / 16, y / 16) / 4;
         oldgrass += Simplex.noise2d(x / 8, y / 8) / 8;
         oldgrass += Simplex.noise2d(x / 4, y / 4) / 8;

         oldgrass *= Simplex.noise2d(x / 256, y / 256);

         if (oldgrass > 0.1) return this.terrain = 'oldgrass'
         else return this.terrain = 'grass';
         }
         }*/
    }

    return Land;
});