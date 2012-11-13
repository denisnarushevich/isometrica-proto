define(function () {
    function Sprite(sprites, model) {
        this.sprites = sprites;
        this.model = model;
        this.offset = [];
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
            var origin = this.getOrigin(), originOffset = this.getOriginOffset(), offset = this.offset;
            offset[0] = originOffset[0] - origin[0];
            offset[1] = originOffset[1] - origin[1];
            return offset;
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
        }
    }

    return Sprite;
});