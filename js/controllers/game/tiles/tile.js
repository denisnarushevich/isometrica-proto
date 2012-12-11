define(function () {

    function Tile(tiles, x, y) {
        var grid = tiles.world.grid;

        this.gridPoints = [
            grid.getPoint(x, y),
            grid.getPoint(x, y + 1),
            grid.getPoint(x + 1, y + 1),
            grid.getPoint(x + 1, y)
        ];
        this.position = this.gridPoints[0];
        this.tiles = tiles;

        this.terrain = this.getaTerrain();
        this.type = this.getaType();
        this.slopeId = this.getaSlopeId();

        if (this.type == 'land')
            this.plantTree();
        else if (this.type == 'water') {
            this.position.deep = tiles.world.waterLevel - this.position.z;
            this.position.z = tiles.world.waterLevel;
            this.spriteType = 'WaterTileSprite';
        }
    }

    ;

    Tile.prototype = {
        id:null,
        type:null,
        tiles:null,
        gridPoints:null,
        slopeId:null,
        spriteType:'TileSprite',
        terrain:null,
        position:null,
        isPointedStatus:false,

        update:function () {
            if (this.type == 'land' && Math.random() > 0.5 && this.position.x == 212 && this.position.y == 1027) {
                var a = this.tiles.world.objects.createObject('CarObject', this.position.x, this.position.y);
                a.setDestination(this.tiles.getTile(212 + Math.round(Math.random() * 80 - 40), 1027 + Math.round(Math.random() * 80 - 40)));
            }
            return this;
        },

        getaSlopeId:function () {
            if (this.type == 'water')return 2222;
            var gridPoints = this.gridPoints,
                z0 = gridPoints[0].z;
            return this.slopeId = 2000 + (gridPoints[1].z - z0 + 2) * 100 + (gridPoints[2].z - z0 + 2) * 10 + (gridPoints[3].z - z0 + 2);
        },

        getaTerrain:function () {
            var terrain = '';
            switch (this.type) {
                case 'water':
                    terrain = ''
                    break;
                case 'land':
                    terrain = 'grass';
                    break;
                case 'shore':
                    terrain = 'grass';
                    break;
            }

            return this.terrain;

            /*     var sand = 0, x = this.x, y = this.y;

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
             else return this.terrain = 'grass';*/
        },

        getaType:function () {
            var gridPoints = this.gridPoints,
                waterLevel = this.tiles.world.waterLevel,
                z = gridPoints[0].z + gridPoints[1].z + gridPoints[2].z + gridPoints[3].z - waterLevel*4;
                type = 'land';

            if ( z <= 0 )
                type = 'water';
            else if (z < 4)
                type = 'coast';

            return type;
        },

        plantTree:function () {
            var world = this.tiles.world,
                pos = this.position,
                x = pos.x,
                y = pos.y;

            if (world.objects.getObjectsInTile(x, y).length == 0 && world.forestDistribution(x, y) > 0) {
                var d = world.forestDistribution(x * 2, y * 2);
                var tree = ['Tree1Object', 'Tree2Object'][Math.ceil(d)];
                var posX = x + 1 / 2 + world.forestDistribution(y / 2, x / 2) / 4;
                var posY = y + 1 / 2 + world.forestDistribution(x / 2, y / 2) / 4;
                world.objects.createObject(tree, posX, posY);
            }
            return;
        }
    };

    Tile.prototype.isPointed = function (bool) {
        return  (bool == undefined ? this.isPointedStatus : this.isPointedStatus = bool);
    }

    return Tile;
});