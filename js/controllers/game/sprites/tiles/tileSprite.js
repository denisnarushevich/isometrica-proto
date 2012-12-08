define(['./../sprite'], function (Parent) {
    function TileSprite(sprites, model) {
        Parent.call(this, sprites, model);
    }

    ;

    var p = TileSprite.prototype = Object.create(Parent.prototype);
    p.type = "TileSprite";
    p.size = [64, 47];
    p.origin = [0, 24];

    TileSprite.prototype.getImages = function () {
        var model = this.model,
            imageAssets = this.sprites.images,
            slopeId = model.getSlopeId(),
            images = [imageAssets.getImage('terrain/' + model.getTerrain() + '/' + slopeId)]; //TODO FIX. STRING CONCAT IS VERY SLOWW!!!!

        if(model.isPointed()){
            images[1] = imageAssets.getImage('terrain/misc/highlite/' + slopeId);
        }

        return images;
    };

    return TileSprite;
});

