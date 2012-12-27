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
        var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d');

        canvas.width = this.screen.canvas.width;
        canvas.height = this.screen.canvas.height;

        this.layers.push(context);

        return context;
    };

    Renderer.prototype.clearLayer = function (layer) {
        layer.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
    };

    Renderer.prototype.drawSprite = function (layer, sprite) {
        var images = sprite.getImages(),
            offset = sprite.getOffset(),
            image,
            imagesLen = images.length,
            i,
            x = offset.x | 0,
            y = offset.y | 0;

        for (i = 0; i < imagesLen; i++) {
            //for(var i in images){
            //if($.browser.webkit) ctx.setAlpha(sprites[i].opacity);
            layer.drawImage(images[i], sprite.clip[0], sprite.clip[1], sprite.size[0], sprite.size[1], x, y, sprite.size[0], sprite.size[1]);

            //ctx.putImageData(sprite.getPixels(), sprite.getOffset()[0], sprite.getOffset()[1]);
        }
        //ctx.drawImage(sprite.getCanvas(), sprite.getOriginOffset()[0], sprite.getOriginOffset()[1]);
        //sprite.sprites.freeSprite(sprite);
    };

    Renderer.prototype.renderLayers = function () {
        var layers = this.layers,
            screen = this.screen,
            layer, i;

        for (i = 0; layer = layers[i]; i++)
            screen.drawImage(layer.canvas, 0, 0);
    };

    Renderer.prototype.setSize = function (size) {
        var layers = this.layers,
            canvas = this.screen.canvas,
            layer, i;

        canvas.width = size[0];
        canvas.height = size[1];

        for (i = 0; layer = layers[i]; i++) {
            layer.canvas.width = size[0];
            layer.canvas.height = size[1];
        }

        return this;
    };

    return Renderer;
});