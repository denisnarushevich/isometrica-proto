define([
'./sprites/tiles/landTileSprite',
'./sprites/tiles/roadTileSprite',
'./sprites/tiles/shoreTileSprite',

'./sprites/objects/treeObjectSprite'
],function(){
    var Sprites = function(viewport, images){
        this.viewport = viewport;
        this.images = images;
    };

    Sprites.prototype = {};
    Sprites.prototype.viewport = null;
    Sprites.prototype.images = null;
    Sprites.prototype.constructors = {};

    for (var i = 0, Sprite; Sprite = arguments[i]; i++) {
        Sprites.prototype.constructors[Sprite.prototype.type] = Sprite;
    };

    Sprites.prototype.createSpriteFor = function(model){
        return new this.constructors[model.getSpriteType()](this, model);
    };

    return Sprites;
});