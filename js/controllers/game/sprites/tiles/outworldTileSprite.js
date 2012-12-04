define(['./tileSprite'], function (Parent) {
    function OutworldTileSprite(sprites) {
        Parent.call(this, sprites);
    }

    ;

    var p = OutworldTileSprite.prototype = Object.create(Parent.prototype);
    p.type = "OutworldTileSprite";

    p.getImages = function () {
        var imageAssets = this.sprites.images,
            images = [imageAssets.getImage('terrain/deepwater/2222')];

        return images;
    };

    return OutworldTileSprite;
});