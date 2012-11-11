define(['./objectSprite'], function (Parent) {
    function VehicleObjectSprite(sprites, model) {
        Parent.call(this, sprites, model);
        this.setSize([16, 16]);
        this.setOrigin([8, 10]);
    }

    ;

    VehicleObjectSprite.prototype = Object.create(Parent.prototype);
    VehicleObjectSprite.prototype.type = 'VehicleObjectSprite';

    return VehicleObjectSprite;
});