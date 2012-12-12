define(['views/gameView', './game/controls', './game/graphics', './game/logic'], function (View, Controls, Graphics, Logic) {

    function Game(assets) {
        this.assets = assets;
        this.view = new View();
    }

    var p = Game.prototype;

    p.assets = null;
    p.logic = null;
    p.graphics = null;
    p.mainViewport = null;

    p.renderView = function (rootNode) {
        this.view.el = rootNode;
        this.view.render();
    }

    p.start = function () {
        this.logic = new Logic();
        this.logic.startUpdateLoop();

        this.graphics = new Graphics(this.logic, this.assets.images);
        this.mainViewport = this.graphics.createViewport(mainViewport, this.logic.world.player.position);
        this.graphics.startRenderLoop();

        new Controls(this.logic, this.mainViewport);
    }

    return Game;
});