define(['./vector2'], function (Vec2) {
    var Player = function () {
        this.setPosition(new Vec2(252,1027));
    }

    Player.prototype.position = null;

    Player.prototype.getPosition = function () {
        return this.position;
    };

    Player.prototype.setPosition = function(position){
        this.position = position;
        return this;
    };

    return Player;
});