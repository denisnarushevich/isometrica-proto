define(['lib/webgl-2d/webgl-2d'], function (WebGL2D) {
    return {
        container:null,
        layers:[],
        screen:null,
        init:function (container) {
            this.container = container;

            var cnv = document.createElement('canvas');
            WebGL2D.enable(cnv);
            this.screen = container.appendChild(cnv).getContext('webgl-2d');
            this.screen.canvas.style.cssText = 'width: 100%; height: 100%;';
            this.updateSize();
        },
        createLayer:function () {
            var cnv = document.createElement('canvas');
            WebGL2D.enable(cnv);
            var key = this.layers.push(cnv.getContext('webgl-2d')) - 1;
            this.layers[key].canvas.width = this.screen.canvas.width;
            this.layers[key].canvas.height = this.screen.canvas.height;
            return this.layers[key];
        },
        clearLayer:function (layer) {
            layer.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
        },
        drawSprite:function (layer, sprite) {
            var images = sprite.getImages();
            var offset = sprite.getOffset();

            for (var i = 0; images[i]; i++) {
                //for(var i in images){
                //if($.browser.webkit) ctx.setAlpha(sprites[i].opacity);
                layer.drawImage(images[i], offset[0], offset[1]);

                //ctx.putImageData(sprite.getPixels(), sprite.getOffset()[0], sprite.getOffset()[1]);
            }

            //ctx.drawImage(sprite.getCanvas(), sprite.getOriginOffset()[0], sprite.getOriginOffset()[1]);
        },
        renderLayers:function () {
            var layers = this.layers;
            for (var i = 0; layers[i]; i++) {
                this.screen.drawImage(layers[i].canvas, 0, 0);
            }
        },
        setSize:function (size) {
            var layers = this.layers;

            this.screen.canvas.width = size[0];
            this.screen.canvas.height = size[1];

            for (var i = 0; layers[i]; i++) {
                layers[i].canvas.width = size[0];
                layers[i].canvas.height = size[1];
            }

            return this;
        },
        updateSize:function () {
            this.setSize([this.container.clientWidth, this.container.clientHeight]);
            return this;
        }
    }

});