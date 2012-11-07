define([
'./sprites/tiles/landSprite',
'./sprites/tiles/roadSprite',
'./sprites/tiles/shoreSprite',
'./sprites/tiles/waterSprite',

'./sprites/objects/buildingSprite',
'./sprites/objects/tallBuildingSprite',
'./sprites/objects/treeSprite',
'./sprites/objects/vehicleSprite',
],function(){
    var Sprites = function(viewport, images){
        this.viewport = viewport;
        this.images = images;

        this.tile = {};
        this.object = {};
    };

    Sprites.prototype = {};
    Sprites.prototype.graphics = null;
    Sprites.prototype.constructors = {};
    Sprites.prototype.constructors.object = {};
    Sprites.prototype.constructors.tile = {};
    Sprites.prototype.tile = null;
    Sprites.prototype.object = null;
    for (var i = 0; arguments[i]; i++) {
        var Sprite = arguments[i];
        Sprites.prototype.constructors[Sprite.prototype.type][Sprite.prototype.name] = Sprite;
    };
    Sprites.prototype.images = null;

    Sprites.prototype.getTileSprite = function(tile){
        return this.getSprite('tile', tile);
    };

    Sprites.prototype.getObjectSprite = function(object){
        return this.getSprite('object', object);
    };

    Sprites.prototype.getSprite = function(collectionName, model){
        if(this[collectionName][model.id])
            return this[collectionName][model.id];

        //console.log(collectionName, model.typeName);
        //console.log(1);
        var sprite = new this.constructors[collectionName][model.typeName](model);
        sprite.sprites = this;
        //var pos = model.getPosition();
        //sprite.setOriginOffset(this.graphics.coordinatesTransform(pos.getX(), pos.getY(), pos.getZ()));

        return this[collectionName][model.id] = sprite;
    };

    return Sprites;
});