define(['../assets'], function(assets){
    function TreeSprite(){
        this.image = assets.getImage('objects/Tree1/Tree1');
    }

    var p = TreeSprite.prototype;

    var V2 = Utils.Math.Vec2;

    p.type = 'TreeSprite';
    p.offset = null;
    p.size = new V2(64, 64);
    p.origin = new V2(34, 53);
    p.frames = {
        0: new V2(0, 0)
    };
    p.image = null;
    p.frame = 0;

    return TreeSprite;
});