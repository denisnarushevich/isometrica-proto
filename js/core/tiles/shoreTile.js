define(['./landTile'], function (Parent) {
    function ShoreTile(tiles, gridPoints) {
        Parent.call(this, tiles, gridPoints);
        return this;
    }

    ShoreTile.prototype = Object.create(Parent.prototype);
    ShoreTile.prototype.type = "ShoreTile";
    ShoreTile.prototype.spriteType = 'ShoreTileSprite';

    ShoreTile.prototype.plantTree = function () {
        return;
    };

    return ShoreTile;
});