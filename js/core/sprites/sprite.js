define(function () {
    function Sprite(sprites, model) {
        this.sprites = sprites;
        this.model = model;
        this.offset = [];
        this.images = [];
    }

    Sprite.prototype = {
        originOffset:null,
        size:null,
        origin:null,
        images:null,
        model:null, //tile or 'object' object.
        type: 'Sprite', //e.g. 'tile'
        sprites: null, //sprites *class*
        offset: null,
        setSize:function (size) {
            this.size = size;
            return this;
        },
        setOrigin:function (origin) {
            this.origin = origin;
            return this;
        },
        setModel:function (model) {
            this.model = model;
            return this;
        },
        setOriginOffset:function (offset) {
            this.originOffset = offset;
            return this;
        },
        getOriginOffset:function () {
            return this.originOffset;
        },
        getOffset:function () {
            var origin = this.getOrigin(), originOffset = this.getOriginOffset();
            this.offset[0] = originOffset[0] - origin[0];
            this.offset[1] = originOffset[1] - origin[1];
            return this.offset
        },
        getSize:function () {
            return this.size;
        },
        getOrigin:function () {
            return this.origin;
        },
        getImages:function () {
            return this.images;
        },
        getModel:function () {
            return this.model;
        },

        //test
        getCanvas:function () {
            if (this.canvas)return this.canvas;
            var images = this.getImages();
            var cnv = document.createElement('canvas');
            cnv.width = this.getSize()[0];
            cnv.height = this.getSize()[1];
            var ctx = cnv.getContext('2d');
            for (var i in images) {
                ctx.drawImage(images[i], 0, 0);
            }
            return this.canvas = cnv;
        },
        getPixels:function () {
            if (this.pixelArray)return this.pixelArray;
            return this.getCanvas().getContext('2d').getImageData(0, 0, this.getSize()[0], this.getSize()[1]);
        }
    }

    return Sprite;
});