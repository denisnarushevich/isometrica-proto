define(['./objectSprite'], function (Parent) {
    function BuildingObjectSprite(sprites, model) {
        Parent.call(this, sprites, model);
        this.setSize([64, 64]);
        this.setOrigin([0, 49]);
    }

    ;

    BuildingObjectSprite.prototype = Object.create(Parent.prototype);
    BuildingObjectSprite.prototype.type = 'BuildingObjectSprite';

    return BuildingObjectSprite;
});