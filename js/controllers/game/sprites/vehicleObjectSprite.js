define(['./objectSprite'], function (Parent) {
    function VehicleObjectSprite(sprites, model) {
        Parent.call(this, sprites, model);
    }

    ;

    var p = VehicleObjectSprite.prototype = Object.create(Parent.prototype);
    p.type = 'VehicleObjectSprite';
    p.size = [16, 16];
    p.origin = [8, 10];

    VehicleObjectSprite.prototype.getImages = function () {
        var name = this.model.getName();
        return [this.sprites.images.getImage('objects/vehicles/' + name)];
    }

    return VehicleObjectSprite;
});