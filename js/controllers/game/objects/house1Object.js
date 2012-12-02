define(['./buildingObject'], function (Parent) {
    function House1Object(tile) {
        Parent.call(this, tile); //parent init
    }

    House1Object.prototype = Object.create(Parent.prototype);
    House1Object.prototype.type = 'House1Object';

    return House1Object;
});