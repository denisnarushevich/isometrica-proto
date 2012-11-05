define(['../vector3'], function (Vec3) {
    var Object = function (objects, x, y) {
        this.objects = objects;
        this.position = new Vec3(x, y, objects.world.grid.getValue(x, y));
    };

    Object.prototype.id = null;
    Object.prototype.objects = null;
    Object.prototype.position = null;
    Object.prototype.modelType = 'object';

    Object.prototype.getName = function () {
        return this.name;
    };

    Object.prototype.getPosition = function () {
        return this.position;
    };

    Object.prototype.getType = function () {
        return this.type;
    };

    Object.prototype.getTile = function () {
        var pos = this.getPosition();
        return this.objects.world.tiles.getTile(pos.getX() | 0, pos.getY() | 0);
    };

    Object.prototype.setName = function (name) {
        this.name = name;
        return this;
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