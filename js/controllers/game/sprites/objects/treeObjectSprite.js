define(['./objectSprite'], function (Parent) {
    function TreeObjectSprite(sprites, model) {
        Parent.call(this, sprites, model);
    }

    ;

    var p = TreeObjectSprite.prototype = Object.create(Parent.prototype);
    p.type = "TreeObjectSprite";
    p.size = [64, 64];
    p.origin = [34, 53];

    return TreeObjectSprite;
});