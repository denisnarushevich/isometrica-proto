define(['./object'], function (Parent) {
    function BuildingObject(tile) {
        Parent.call(this, tile); //parent init()
    }

    BuildingObject.prototype = Object.create(Parent.prototype);
    BuildingObject.prototype.type = 'BuildingObject';

    return BuildingObject;
});
  