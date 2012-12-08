define(['./tileSprite'], function (Parent) {
    function ShoreTileSprite(sprites, model) {
        Parent.call(this, sprites, model);
    }

    ;

    ShoreTileSprite.prototype = Object.create(Parent.prototype);
    ShoreTileSprite.prototype.type = "ShoreTileSprite";

    ShoreTileSprite.prototype.getImages = function () {
        var model = this.model,
            imageAssets = this.sprites.images;
            slopeId = model.getSlopeId();
            images = [imageAssets.getImage('terrain/' + model.getTerrain() + '/' + slopeId),
                imageAssets.getImage('terrain/shore/' + slopeId)];

        if(model.isPointed()){
            images[3] = imageAssets.getImage('terrain/misc/highlite/' + slopeId);
        }

        return images;
    }

    return ShoreTileSprite;
});