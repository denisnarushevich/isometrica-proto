define([
    './objects/tree1Object',
    './objects/tree2Object',
    './objects/carObject'
], function () {

    var Objects = function (world) {
        this.world = world;
        this.objectsArray = new Array();
        this.objectsIdArray = new Array();
        this.lastId = 0;
    };

    Objects.prototype.lastId = 0;

    Objects.prototype.constructors = {};
    for (var i = 0; arguments[i]; i++) {
        var Object = arguments[i];

        Objects.prototype.constructors[Object.prototype.type] = Object;
    }
    ;

    Object.prototype.objectsArray = null;
    Object.prototype.objectsIdArray = null;

    Objects.prototype.update = function () {
        var radius = 40,
            playerPosition = this.world.player.position,
            x0 = (playerPosition.x - radius) | 0,
            x1 = (playerPosition.x + radius) | 0,
            y0 = (playerPosition.y - radius) | 0,
            y1 = (playerPosition.y + radius) | 0;

        for (var x = x0; x < x1; x++)
            for (var y = y0; y < y1; y++) {
                var objects = this.getObjectsInTile(x, y);
                for (var i = 0; objects[i]; i++) {
                    var object = objects[i],
                        pos = object.getPosition(),
                        floorX = pos.x | 0,
                        floorY = pos.y | 0;

                    object.update();

                    if (floorX != x || floorY != y) { //if obj tile coordinates have changed
                        if (i == objects.length - 1) //if faulty obj is last in array
                            objects.pop(); //...you can just pop it...
                        else
                            objects[i] = objects.pop(); //...otherwise you should replace it.

                        //now just push it on right XY.
                        this.getObjectsInTile(floorX, floorY).push(object);
                    }
                }
            }
    };

    Objects.prototype.getObjectsInTile = function (x, y) {
        var objectsArray = this.objectsArray;

        if (objectsArray[x]) {
            if (objectsArray[x][y])
                return objectsArray[x][y];
        } else
            objectsArray[x] = [];

        return objectsArray[x][y] = [];
    };

    Objects.prototype.getObjectById = function (id) {
        return this.objectsIdArray[id];
    };

    Objects.prototype.createObject = function (name, x, y) {
        var constructor = this.constructors[name],
            object;

        if (constructor !== undefined) {

            object = new this.constructors[name](this, x, y);

            this.getObjectsInTile(x | 0, y | 0).push(object);

            this.objectsIdArray[object.id = this.lastId++] = object;

            object.globalId = this.world.lastGlobalId++;
        } else
            throw "Don't have object constructor with name " + name;

        return object;
    };

    Objects.prototype.destroyObject = function (object) {
        delete this.objectsIdArray[object.id];

        var pos = object.getPosition();
        var obj, objects = this.objectsArray[pos.x | 0][pos.y | 0];

        for (var i = 0; objects[i]; i++) {
            obj = objects[i];
            if (obj.id == object.id) {
                if (i == objects.length - 1)
                    objects.pop();
                else
                    objects[i] = objects.pop();
            } else continue;
        }
    };

    return Objects;
});