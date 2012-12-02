define(['./objectSprite'], function (Parent) {
    function VehicleObjectSprite(sprites, model) {
        Parent.call(this, sprites, model);
        this.setSize([16, 16]);
        this.setOrigin([8, 10]);
    }

    ;

    VehicleObjectSprite.prototype = Object.create(Parent.prototype);
    VehicleObjectSprite.prototype.type = 'VehicleObjectSprite';

    VehicleObjectSprite.prototype.getImages = function(){
        var name = this.getModel().getName();
        return [this.sprites.images.getImage('objects/vehicles/'+name)];
    }

    return VehicleObjectSprite;
});