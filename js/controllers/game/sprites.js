define([
    './sprites/tileSprite',

    './sprites/treeObjectSprite',
    './sprites/vehicleObjectSprite',
], function () {
    var Sprites = function (viewport, images) {
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
    }
    ;

    Sprites.prototype.createSpriteFor = function (model) {
        /*var sprite,
            spritesById = this.spritesById,
            constructor;*/

        //if is cached return cached
        //if(sprite = spritesById[model.globalId])return sprite;

        //...if not then get the constructor
        var constructor = this.constructors[model.spriteType];

        //...and instaniate, if consturctor for such model type exists
        if (constructor)
        //return spritesById[model.globalId] =  new constructor(this, model);
            return new constructor(this, model);
        else
            throw "Don't have sprite constructor with name " + model.getSpriteType();
    };

    return Sprites;
});