define(['./movingObject', '../pathFinder', '../vector2'], function (Parent, pathFinder, Vec2) {
    var Vehicle = function (objects, x, y) {
        Parent.call(this, objects, x, y);

        this.direction = new Vec2(0, 0);
        this.path = [];
        this.updatedAt = new Date().getTime() / 1000;
    };

    Vehicle.prototype = Object.create(Parent.prototype);
    Vehicle.prototype.type = 'VehicleObject';
    Vehicle.prototype.spriteType = 'VehicleObjectSprite';
    Vehicle.prototype.speed = 2;

    var p = Vehicle.prototype;

    p.destination = null;

    p.setDestination = function (destinationTile) {
        this.destination = destinationTile;
        this.path = this.travelTo(destinationTile);
    }

    Vehicle.prototype.travelTo = function (destinationTile) {
        this.path = pathFinder.findPath(this.getTile(), destinationTile, function (tile) {
            return tile.type != "land";
        });
        //this.updatedAt = new Date().getTime() / 1000;
        return this.path;
    };

    Vehicle.prototype.update = function () {
        if (this.path.length != 0) {
            //get next tile in path
            var next = this.path[0];

            //get direction
            this.getDirection().setX(next.position.x - this.getTile().position.x);
            this.getDirection().setY(next.position.y - this.getTile().position.y);
            this.getDirection().normalize();

            //get time passed from prev update
            var now = new Date().getTime() / 1000; //seconds, milliseconds
            var deltaTime = now - this.updatedAt;

            //get distance passed from last update
            var distance = deltaTime * this.getSpeed();

            //add distance to curr pos
            this.position.x += distance * this.direction.x;
            this.position.y += distance * this.direction.y;

            if (next.id == this.getTile().id) {
                this.path.shift();
            }
        }
        this.updatedAt = new Date().getTime() / 1000;
        return Parent.prototype.update.call(this);
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