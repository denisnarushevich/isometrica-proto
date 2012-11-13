define(['./../sprite'], function (Parent) {
    function TileSprite(sprites, model) {
        Parent.call(this, sprites, model);
        this.setSize([64, 47]);
        this.setOrigin([0, 24]);
        this.highlited = false;
    }

    ;

    TileSprite.prototype = Object.create(Parent.prototype);
    TileSprite.prototype.type = "TileSprite";

    TileSprite.prototype.getImages = function () {
        var model = this.getModel(),
            imageAssets = this.sprites.images,
            slopeId = model.getSlopeId(),
            images = [imageAssets.getImage('terrain/' + model.getTerrain() + '/' + slopeId)];

        if(model.isPointed()){
            images.push(imageAssets.getImage('terrain/misc/highlite/' + slopeId));
        }

        return images;
    };

    return TileSprite;
});

