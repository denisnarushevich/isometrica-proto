define(['./scene', './renderer', './sprites'], function (Scene, Renderer, Sprites) {

    var Graphics = function (viewportBox, logic, assets) {
        this.layers = {};
        this.renderer = new Renderer(viewportBox);
        this.sprites = new Sprites(this, assets.images);
        this.scene = new Scene(viewportBox, logic.player.getPosition(), this);
        this.logic = logic;

        /*        chesterGL.setup(renderer.screen.canvas.id = 'mainScreen');
         var size = chesterGL.viewportSize();
         chesterGL.loadAsset('texture', 'https://chestergl.commondatastorage.googleapis.com/images/star.png', 'star');*/


        this.layers.tiles = this.renderer.createLayer('tiles');
        this.layers.objects = this.renderer.createLayer('objects');

        //on window resize, we update size of canvases
        var graphics = this;
        window.onresize = function () {
            graphics.resize();
        }
    };

    Graphics.prototype.layers = null;
    Graphics.prototype.renderer = null;
    Graphics.prototype.sprites = null;
    Graphics.prototype.scene = null;
    Graphics.prototype.logic = null;

    Graphics.prototype.resize = function () {
        this.renderer.updateSize();
        this.scene.updateSize();
    };

    Graphics.prototype.renderFrame = function () {
        var tiles = this.scene.getTiles();
        var objects = this.scene.getObjects();
        var layers = this.layers;

        this.renderer.clearLayer(layers.tiles);

        for (var i = 0; tiles[i]; i++)
            this.renderer.drawSprite(layers.tiles, tiles[i]); //tile layer

        this.renderer.clearLayer(layers.objects);

        for (var i = 0; objects[i]; i++) //~5ms
            this.renderer.drawSprite(layers.objects, objects[i]); //object layer*/

        this.renderer.renderLayers();
    };

    Graphics.prototype.renderFrames = function () {
        this.renderFrame();
        var graphics = this;
        window.requestAnimFrame(function () {
            graphics.renderFrames();
        });
    }

    Graphics.prototype.coordinatesTransform = function (x, y, z) {
        var gridSpacing = this.logic.world.grid.spacing;
        var angle = Math.PI / -4;

        x = (x - this.scene.at.x) * gridSpacing[0];
        y = (y - this.scene.at.y) * gridSpacing[1];
        z *= gridSpacing[2];

        return [
            1 + x * Math.cos(angle) - y * Math.sin(angle) + this.scene.size[0] / 2 | 0,
            1 - ( x * Math.sin(angle) + y * Math.cos(angle) - this.scene.size[1] ) / 2 - z | 0
        ];
    }

    return Graphics;
});