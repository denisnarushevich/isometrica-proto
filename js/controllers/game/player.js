define(function () {
    var Player = function (position) {
        this.setPosition(position);
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