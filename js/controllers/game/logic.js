define(['./world', ], function (World) {
    var Logic = function () {
        this.world = new World();
        this.date = new Date();
    };

    var p = Logic.prototype;

    p.date = null;

    Logic.prototype.update = function () {
        this.date = new Date();
        this.world.update();
        //this.player.getPosition().setX(this.player.getPosition().getX() +2);
    };

    Logic.prototype.startUpdateLoop = function () {
        var logic = this;
        setInterval(function () {
            logic.update();
        }, 40);
    };

    return Logic;
});