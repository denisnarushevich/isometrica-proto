define(function () {
    function Sprite(sprites, model) {
        this.sprites = sprites;
        this.model = model;
    }

    Sprite.prototype = {
        zIndex:0,
        size:null,
        origin:null,
        images:null,
        model:null, //tile or 'object' object.
        type:'Sprite', //e.g. 'tile'
        sprites:null, //sprites *class*
        offset:null,
        clip:[0, 0],
        setSize:function (size) {
            this.size = size;
            return this;
        },
        setOrigin:function (origin) {
            this.origin = origin;
            return this;
        },
        setOriginOffset:function (offset) {
            var or = this.origin;
            this.zIndex = offset.y;
            offset.x -= or[0];
            offset.y -= or[1];
            this.offset = offset;
            return this;
        },
        getOriginOffset:function () {
            return this.originOffset;
        },
        getOffset:function () {
            return this.offset;
            if (this.offset)return this.offset;
            var origin = this.origin, originOffset = this.originOffset;
            return this.offset = [originOffset[0] - origin[0],
                originOffset[1] - origin[1]];
        },
        getSize:function () {
            return this.size;
        },
        getOrigin:function () {
            return this.origin;
        },
        getImages:function () {
            return this.images;
        }
    }

    return Sprite;
});