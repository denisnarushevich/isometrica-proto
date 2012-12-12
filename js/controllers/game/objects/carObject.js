define(['./vehicleObject'], function (Parent) {
    function CarObject(objects, x, y) {
        Parent.call(this, objects, x, y)
    }

    var p = CarObject.prototype = Object.create(Parent.prototype);

    p.type = "CarObject";
    p.name = "car1";

    return CarObject;
});