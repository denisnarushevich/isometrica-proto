define(['./vector2'], function (Vec2) {
    var player = function () {
        this.setPosition(new Vec2(252,1027));
    }

    player.prototype.position = null;

    player.prototype.getPosition = function () {
        return this.position;
    };

    player.prototype.setPosition = function(position){
        this.position = position;
        return this;
    };
});