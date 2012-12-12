define(['./world', ], function (World) {
    var logic = function () {
        this.world = new World();
    };

    logic.prototype.update = function () {
        this.world.update();
        //this.player.getPosition().setX(this.player.getPosition().getX() +2);
    };

    logic.prototype.startUpdateLoop = function () {
        var logic = this;
        setInterval(function () {
            logic.update();
        }, 40);
    };

    return logic;
});