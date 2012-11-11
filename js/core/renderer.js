define(function () {
    var Renderer = function (containerElement) {
        this.layers = [];
        this.container = containerElement;
        this.screen = this.container.appendChild(document.createElement('canvas')).getContext('2d');
        this.screen.canvas.style.cssText = 'width: 100%; height: 100%;';
    }

    Renderer.prototype.container = null;
    Renderer.prototype.screen = null;
    Renderer.prototype.layers = null;

    Renderer.prototype.createLayer = function () {
        var key = this.layers.push(document.createElement('canvas').getContext('2d')) - 1;
        this.layers[key].canvas.width = this.screen.canvas.width;
        this.layers[key].canvas.height = this.screen.canvas.height;
        return this.layers[key];
    };

    Renderer.prototype.clearLayer = function (layer) {
        layer.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
    };

    Renderer.prototype.drawSprite = function (layer, sprite) {
        var images = sprite.getImages();
        var offset = sprite.getOffset();

        for (var i = 0; i < images.length; i++) {
            //for(var i in images){
            //if($.browser.webkit) ctx.setAlpha(sprites[i].opacity);
            layer.drawImage(images[i], offset[0] | 0, offset[1] | 0);

            //ctx.putImageData(sprite.getPixels(), sprite.getOffset()[0], sprite.getOffset()[1]);
        }

        //ctx.drawImage(sprite.getCanvas(), sprite.getOriginOffset()[0], sprite.getOriginOffset()[1]);
        //sprite.sprites.freeSprite(sprite);
    };

    Renderer.prototype.renderLayers = function () {
        var layers = this.layers;
        for (var i = 0; i < layers.length; i++) {
            this.screen.drawImage(layers[i].canvas, 0, 0);
        }
    };

    Renderer.prototype.setSize = function (size) {
        var layers = this.layers;

        this.screen.canvas.width = size[0];
        this.screen.canvas.height = size[1];

        for (var i = 0; i < layers.length; i++) {
            layers[i].canvas.width = size[0];
            layers[i].canvas.height = size[1];
        }

        return this;
    };

    return Renderer;
});