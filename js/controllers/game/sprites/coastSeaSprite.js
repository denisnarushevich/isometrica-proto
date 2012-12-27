define(['../assets'], function (assets) {
    function CoastSeaSprite() {
        this.offset = new Utils.Math.Vec2(0, 0);
        this.image = assets.getImage('terrain/sea/sea');
    }

    var p = CoastSeaSprite.prototype;

    var V2 = Utils.Math.Vec2;

    p.type = 'CoastSeaSprite';
    p.offset = null;
    p.size = new V2(64, 64);
    p.origin = new V2(0, 24);
    p.frames = {
        2222:new V2(64, 0), //2222
        2111:new V2(128, 0), //2111
        2223:new V2(192, 0), //2223
        2112:new V2(256, 0), //2112
        2232:new V2(320, 0), //2232
        2121:new V2(384, 0), //2121
        2233:new V2(448, 0), //2233
        2122:new V2(512, 0), //2122
        2322:new V2(576, 0), //2322
        2211:new V2(640, 0), //2211
        2323:new V2(704, 0), //2323
        2212:new V2(768, 0), //2212
        2332:new V2(832, 0), //2332
        2221:new V2(896, 0), //2221
        2333:new V2(960, 0), //2333
        2321:new V2(1024, 0), //2321
        2123:new V2(1088, 0), //2123
        2101:new V2(1152, 0), //2101
        2343:new V2(1216, 0), //2343
        1111:new V2(0, 0) //2222 deep
    };
    p.image = null;
    p.frame = 0;

    p.getOffset = function () {
        var frameOffset = this.frames[this.frame];

        this.offset.x = frameOffset.x - this.origin.x;
        this.offset.y = frameOffset.y - this.origin.y;

        return this.offset;
    }

    return CoastSeaSprite;
})
;