define(['./world', './player'], function (World, Player) {
    var logic = function () {
        this.player = new Player();
        this.world = new World(this.player);
    };

    logic.prototype.update = function () {
        this.world.update();
        this.player.getPosition().setX(this.player.getPosition().getX() - 1);
    };

    logic.prototype.startUpdateLoop = function () {
        var logic = this;
        setInterval(function () {
            logic.update();
        }, 40);
    };

    return logic;
});