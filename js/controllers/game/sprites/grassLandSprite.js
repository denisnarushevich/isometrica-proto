define(['../assets'], function(assets){
    function GrassLandSprite(){
        this.image = assets.getImage('terrain/grass/grass');
    }

    var p = GrassLandSprite.prototype;

    var V2 = Utils.Math.Vec2;

    p.type = 'GrassLandSprite';
    p.offset = null;
    p.size = new V2(64, 47);
    p.origin = new V2(0, 24);
    p.frames = {
        2222: new V2(0, 0), //2222
        2111: new V2(81, 0), //2111
        2223: new V2(161, 0), //2223
        2112: new V2(241, 0), //2112
        2232: new V2(321, 0), //2232
        2121: new V2(399, 0), //2121
        2233: new V2(479, 0), //2233
        2122: new V2(559, 0), //2122
        2322: new V2(639, 0), //2322
        2211: new V2(719, 0), //2211
        2323: new V2(799, 0), //2323
        2212: new V2(879, 0), //2212
        2332: new V2(959, 0), //2332
        2221: new V2(1039, 0), //2221
        2333: new V2(1119, 0), //2333
        2321: new V2(1197, 0), //2321
        2123: new V2(1277, 0), //2123
        2101: new V2(1358, 0), //2101
        2343: new V2(1437, 0) //2343
    };
    p.image = null;
    p.frame = 0;

    return GrassLandSprite;
});