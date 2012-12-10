define(['./vector2'], function (Vec2) {
    function WorldPosition(world, x, y) {
        this.world = world;
        Vec2.call(this, x, y);
    }

    ;

    WorldPosition.prototype = Object.create(Vec2.prototype);

    WorldPosition.prototype.world = null;

    WorldPosition.prototype.setX = function (x) {
        if (x < 0 || x > this.world.size.getX())
            return false;
        else
            return this.x = x;
    };

    WorldPosition.prototype.setY = function (y) {
        if (y < 0 || y > this.world.size.getY())
            return false;
        else
            return this.y = y;
    };

    return WorldPosition;
});