define(['./tileSprite'], function (Parent) {
    function LandTileSprite(sprites, model) {
        Parent.call(this, sprites, model);
    }

    ;

    LandTileSprite.prototype = Object.create(Parent.prototype);
    LandTileSprite.prototype.type = "LandTileSprite";

    return LandTileSprite;
});