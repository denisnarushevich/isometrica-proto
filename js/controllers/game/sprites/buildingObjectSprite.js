define(['./objectSprite'], function (Parent) {
    function BuildingObjectSprite(sprites, model) {
        Parent.call(this, sprites, model);
    }

    ;

    var p = BuildingObjectSprite.prototype = Object.create(Parent.prototype);
    p.type = 'BuildingObjectSprite';
    p.size = [64, 64];
    p.origin = [0, 49];

    return BuildingObjectSprite;
});