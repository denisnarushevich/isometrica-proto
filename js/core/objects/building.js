define(['./object'], function (Parent) {
    var Building = function (tile) {
        Parent.call(this, tile); //parent init()
    }

    Building.prototype = Object.create(Parent.prototype);
    Building.prototype.type = 'building';
    Building.prototype.typeName = 'building';

    return Building;
});
  