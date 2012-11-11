define(['./objectSprite'], function (Parent) {
    function TreeObjectSprite(sprites, model) {
        Parent.call(this, sprites, model);
        this.setSize([64, 64]);
        this.setOrigin([34, 53]);
    }

    ;

    TreeObjectSprite.prototype = Object.create(Parent.prototype);
    TreeObjectSprite.prototype.type = "TreeObjectSprite";

    return TreeObjectSprite;
});