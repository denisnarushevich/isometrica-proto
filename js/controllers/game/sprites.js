define([
'./sprites/tiles/landTileSprite',
'./sprites/tiles/roadTileSprite',
'./sprites/tiles/shoreTileSprite',

'./sprites/objects/treeObjectSprite',
'./sprites/objects/vehicleObjectSprite',
],function(){
    var Sprites = function(viewport, images){
        this.viewport = viewport;
        this.images = images;

        this.spritesById = [];
    };

    Sprites.prototype = {};
    Sprites.prototype.viewport = null;
    Sprites.prototype.images = null;
    Sprites.prototype.constructors = {};

    Sprites.prototype.spritesById = null;

    for (var i = 0, Sprite; Sprite = arguments[i]; i++) {
        Sprites.prototype.constructors[Sprite.prototype.type] = Sprite;
    };

    Sprites.prototype.createSpriteFor = function(model){
        var sprite,
            spritesById = this.spritesById,
            constructor;

        if(sprite = spritesById[model.globalId])return sprite;

        constructor = this.constructors[model.getSpriteType()];

        if(constructor !== undefined)
            return this.spritesById[model.globalId] =  new this.constructors[model.getSpriteType()](this, model);
        else
            throw "Don't have sprite constructor with name "+model.getSpriteType();
    };

    return Sprites;
});