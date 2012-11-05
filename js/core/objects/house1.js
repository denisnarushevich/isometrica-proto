define(['./building'], function (parent) {
    var house1 = function (tile) {
        parent.call(this, tile); //parent init
    }

    house1.prototype = Object.create(parent.prototype);
    house1.prototype.name = 'house1';

    return house1;
});