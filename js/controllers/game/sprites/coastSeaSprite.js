define(['./sprite'], function(Parent){
    function CoastSeaSprite(sprite, model){
        Parent.call(this, sprite, model);
    }

    var p = CoastSeaSprite.prototype = Object.create(Parent.prototype);

    //var V2 = Utils.Math.Vec2;
    var V2 = Array;

    p.size = new V2(64, 64);
    p.origin = new V2(0, 24);
    p.frames = {
        22220: [0, 0],
        2222: new V2(64, 0),
        2111: new V2(128, 0),
        2223: new V2(192, 0),
        2112: new V2(256, 0),
        2232: new V2(320, 0),
        2121: new V2(384, 0),
        2233: new V2(448, 0),
        2122: new V2(512, 0),
        2322: new V2(576, 0),
        2211: new V2(640, 0),
        2323: new V2(704, 0),
        2212: new V2(768, 0),
        2332: new V2(832, 0),
        2221: new V2(896, 0),
        2333: new V2(960, 0),
        2321: new V2(1024, 0),
        2123: new V2(1088, 0),
        2101: new V2(1152, 0),
        2343: new V2(1216, 0)
    };

    return CoastSeaSprite;
});