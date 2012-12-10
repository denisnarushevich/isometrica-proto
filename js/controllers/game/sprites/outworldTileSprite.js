define(['./sprite'], function (Parent) {
    function TileSprite(sprites, model) {
        Parent.call(this, sprites, model);
    }

    ;

    var p = TileSprite.prototype = Object.create(Parent.prototype);

    p.type = "OutworldTileSprite";
    p.size = [64, 47];
    p.origin = [0, 24];
    p.clip = [0, 0];

    TileSprite.prototype.getImages = function () {
        var imageAssets = this.sprites.images,
            images = [imageAssets.getImage('terrain/deepsea/deepsea')];

        return images;
    };

    return TileSprite;
});

