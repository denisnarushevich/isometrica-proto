define(['./tileSprite'], function (Parent) {
    function ShoreTileSprite(sprites, model) {
        Parent.call(this, sprites, model);
    }

    ;

    ShoreTileSprite.prototype = Object.create(Parent.prototype);
    ShoreTileSprite.prototype.type = "ShoreTileSprite";

    ShoreTileSprite.prototype.getImages = function () {
        Parent.prototype.getImages.call(this);

        this.images.push(this.sprites.images.getImage('terrain/shore/' + this.getModel().getSlopeId()));
        this.highlite();
        return this.images;
    }

    return ShoreTileSprite;
});