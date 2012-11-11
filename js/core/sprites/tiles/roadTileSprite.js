define(['./tileSprite'], function (Parent) {
    function RoadTileSprite(sprites, model) {
        Parent.call(this, sprites, model);
    }

    ;

    RoadTileSprite.prototype = Object.create(Parent.prototype);
    RoadTileSprite.prototype.type = "RoadTileSprite";

    RoadTileSprite.prototype.getImages = function () {
        Parent.prototype.getImages.call(this);

        this.images.push(resources.getImage('terrain/road/' + this.getModel().getShape() + '-' + this.getModel().getPlacing()));

        return this.images;
    }

    return RoadTileSprite;
});