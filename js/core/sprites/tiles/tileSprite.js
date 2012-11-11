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

    TileSprite.prototype.type = 0;
    //Sprite.prototype.size = new Uint16Array([64, 47]);
    //Sprite.prototype.origin = new Uint16Array([0, 24]);

    TileSprite.prototype.getImages = function () {
        var model = this.getModel();
        this.images.push(this.sprites.images.getImage('terrain/' + model.getTerrain() + '/' + model.getSlopeId()));
        this.highlite();
        return this.images;
    };

    TileSprite.prototype.highlite = function () {
        var model = this.getModel();
        if(model.isPointed()){
            this.images.push(this.sprites.images.getImage('terrain/misc/highlite/'+model.getSlopeId()));
        }
        return this;
    };

    return TileSprite;
});

