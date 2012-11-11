define(['./controls', './graphics', './logic'], function (Controls, Graphics, Logic) {

    function Core(mainViewportContainerElement, assets) {
        this.assets = assets;

        this.logic = new Logic();
        this.logic.startUpdateLoop();

        this.graphics = new Graphics(this.logic, assets.images);
        this.mainViewport = this.graphics.createViewport(mainViewportContainerElement, this.logic.world.player.getPosition());
        this.graphics.startRenderLoop();

        new Controls(this.logic, this.mainViewport);
    }

    Core.prototype.assets = null;
    Core.prototype.logic = null;
    Core.prototype.graphics = null;
    Core.prototype.mainViewport = null;

    return Core;
});