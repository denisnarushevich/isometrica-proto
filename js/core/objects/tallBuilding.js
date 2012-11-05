define(['./object'], function (parent) {
    var building = function (tile) {
        parent.call(this, tile); //parent init
    }

    building.prototype = Object.create(parent.prototype);
    building.prototype.type = 'tallBuilding';

    return building;
});
  