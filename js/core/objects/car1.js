define(['./vehicle'], function (parent) {
    var car1 = function (tile) {
        parent.call(this, tile); //parent init
    };

    car1.prototype = Object.create(parent.prototype);
    car1.prototype.name = 'car1';

    return car1;
});