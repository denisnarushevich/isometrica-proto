define(function () {
    var Player = function (world, position) {
        this.world = world;
        this.position = position;
    }

    var p = Player.prototype

    p.position = null;

    p.update = function () {
        if (this.position.x < 0)
            this.position.x = 0;

        if (this.position.x > this.world.size.x)
            this.position.x = this.world.size.x;

        if (this.position.y < 0)
            this.position.y = 0;

        if (this.position.y > this.world.size.y)
            this.position.y = this.world.size.y;
    }

    return Player;
});