define(['./grid', './tiles', 'lib/simplex/simplex-noise', './objects', './player', './worldPosition'], function (Grid, Tiles, Simplex, Objects, Player, WorldPosition) {
    var World = function () {
        this.waterLevel = 0;
        this.size = new Utils.Math.Vec2(65535, 65535);
        this.lastGlobalId = 0;

        this.player = new Player(this, new Utils.Math.Vec2(252, 1027));

        var simplex = new Simplex([151, 160, 137, 91, 90, 15,
            131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
            190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
            88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
            77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
            102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
            135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
            5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
            223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
            129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
            251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
            49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
            138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180]);

        //passing function generates Z value for grid points.
        //This realisation is using many octaves, to have realistic view of terrain contour, coastline.
        //but because at the same time we need it to have smooth slopec <45Deg, there's a drawback - its too flat
        //height varies only from -16 to 16. can't afford anymore, because then there will be cliffs.
        //it would be good to invent something better then this aproach, with smooth slopes  and different landscape
        this.grid = new Grid(this, function (x, y) {
            var land = 0, island = 0;

            land += simplex.noise2D(x / 512, y / 512) / 2; //noisemap of continets
            land += simplex.noise2D(x / 256, y / 256) / 4; //of smaler lands
            land += simplex.noise2D(x / 128, y / 128) / 8;  //...
            land += simplex.noise2D(x / 64, y / 64) / 16; //...
            land += simplex.noise2D(x / 32, y / 32) / 32; //...
            land += simplex.noise2D(x / 16, y / 16) / 64; //...
            land += simplex.noise2D(x / 8, y / 8) / 64; //small details

            island += simplex.noise2D(x / 64, y / 64) / 10;
            island += simplex.noise2D(x / 32, y / 32) / 20;
            island += simplex.noise2D(x / 16, y / 16) / 40;
            island += simplex.noise2D(x / 8, y / 8) / 40;

            return Math.floor((0.8 * land + 0.2 * island) * 16);
        });

        this.forestDistribution = function (x, y) {
            return simplex.noise2D(x, y);
        }

        this.tiles = new Tiles(this);
        this.objects = new Objects(this);
    };

    World.prototype.grid = null;
    World.prototype.tiles = null;
    World.prototype.objects = null;
    World.prototype.waterLevel = null;
    World.prototype.size = null;
    World.prototype.player = null;
    World.prototype.lastGlobalId = null;


    World.prototype.update = function () {
        this.tiles.update();
        this.objects.update();
        this.player.update();
    };

    return World;
});