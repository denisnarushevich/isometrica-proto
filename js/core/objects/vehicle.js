define(['./movingObject', '../pathFinder', '../vector2'], function (Parent, pathFinder, Vec2) {
    var Vehicle = function (objects, x, y) {
        Parent.call(this, objects, x, y);

        this.direction = new Vec2(0, 0);
        this.path = [];
        this.updatedAt = null;
    };

    Vehicle.prototype = Object.create(Parent.prototype);
    Vehicle.prototype.type = 'vehicle';
    Vehicle.prototype.typeName = 'vehicle';
    Vehicle.prototype.speed = 2;

    Vehicle.prototype.travelTo = function (destinationTile) {
        this.path = pathFinder.findPath(this.getTile(), destinationTile, function (tile) {
            return tile.getType() != tile._ROAD;
        });
        this.updatedAt = new Date().getTime() / 1000;
    };

    Vehicle.prototype.update = function () {
        Parent.prototype.update.call(this);

        if (this.updatedAt) {
            var now = new Date().getTime() / 1000; //seconds, milliseconds
            var deltaTime = now - this.updatedAt;

            var distance = deltaTime * this.getSpeed();

            var next = this.getPath()[ Math.floor(distance + 1) ];

            if (!next) {
                this.destroy();
                return;
            }

            var current = this.getPath()[ Math.floor(distance) ];

            this.getDirection().setX(next.getPosition().getX() - current.getPosition().getX());
            this.getDirection().setY(next.getPosition().getY() - current.getPosition().getY());
            this.getDirection().normalize();

            var pathTile = current;
        }
        return;
    };

    Vehicle.prototype.getDirection = function () {
        return this.direction;
    };

    Vehicle.prototype.align = function () {
        /*if (this.getDirection().getX())
            if (this.getDirection().getX() == 1)
                this.subPosition.setY(0.33);
            else
                this.subPosition.setY(0.66);
        else if (this.getDirection().getY() == 1)
            this.subPosition.setX(0.66);
        else
            this.subPosition.setX(0.33);
            */
    };

    Vehicle.prototype.getSpeed = function () {
        return this.speed;
    };

    Vehicle.prototype.getPath = function () {
        return this.path;
    };

    return Vehicle;
});