define(['./scene', './renderer', './sprites'], function (Scene, Renderer, Sprites) {
    function Viewport(graphics, containerElement, viewPosition) {
        this.containerElement = containerElement;

        this.size = new Int16Array([
            containerElement.clientWidth,
            containerElement.clientHeight
        ]);

        this.graphics = graphics;
        this.scene = new Scene(this, viewPosition);
        this.renderer = new Renderer(containerElement);
        this.sprites = new Sprites(this, graphics.images);

        this.layers = {};
        this.layers.tiles = this.renderer.createLayer();
        this.layers.objects = this.renderer.createLayer();
    }

    ;

    Viewport.prototype.containerElement = null;
    Viewport.prototype.graphics = null;
    Viewport.prototype.scene = null;
    Viewport.prototype.renderer = null;
    Viewport.prototype.sprites = null;
    Viewport.prototype.scene = null;
    Viewport.prototype.layers = null;

    Viewport.prototype.updateSize = function () {
        if (this.size[0] != this.containerElement.clientWidth || this.size[1] != this.containerElement.clientHeight) {
            this.size[0] = this.containerElement.clientWidth;
            this.size[1] = this.containerElement.clientHeight;

            this.scene.setSize(this.size);
            this.renderer.setSize(this.size);
        }
        ;

    };

    Viewport.prototype.render = function () {
        this.updateSize();

        var i, tiles = this.scene.getTiles(),
            objects = this.scene.getObjects(),
            layers = this.layers,
            renderer = this.renderer;

        renderer.clearLayer(layers.tiles);

        for (i = 0; tiles[i]; i++)
            renderer.drawSprite(layers.tiles, tiles[i]); //tile layer

        this.renderer.clearLayer(layers.objects);

        for (i = 0; objects[i]; i++) //~5ms
            renderer.drawSprite(layers.objects, objects[i]); //object layer*/

        renderer.renderLayers();
    };

    return Viewport;
});