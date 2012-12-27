define(function () {
    function Object(objects, x, y) {
        this.objects = objects;
        this.position = new Utils.Math.Vec3(x, y, objects.world.grid.getValue(x, y));
    }

    ;

    Object.prototype.id = null;
    Object.prototype.objects = null;
    Object.prototype.position = null;
    Object.prototype.type = 'Object';
    Object.prototype.baseType = 'Object';
    Object.prototype.spriteType = null;
    Object.prototype.name = null;

    Object.prototype.getName = function () {
        return this.name;
    };

    Object.prototype.getPosition = function () {
        return this.position;
    };

    Object.prototype.getType = function () {
        return this.type;
    };

    Object.prototype.getBaseType = function () {
        return this.baseType;
    };

    Object.prototype.getSpriteType = function () {
        return this.spriteType;
    };

    Object.prototype.getTile = function () {
        var pos = this.getPosition();
        return this.objects.world.tiles.getTile(pos.x | 0, pos.y | 0);
    };

    Object.prototype.setType = function (typeName) {
        this.type = typeName;
        return this;
    };

    Object.prototype.update = function () {
        return this;
    };

    Object.prototype.destroy = function () {
        this.objects.destroyObject(this);
        return;
    };

    return Object;
});