define(['./controls', './graphics', './logic'], function (Controls, Graphics, Logic) {

    var Core = function (viewportBox, assets) {
        this.assets = assets;
        this.logic = new Logic();
        this.graphics = new Graphics(viewportBox, this.logic, assets);
        this.controls = new Controls(this.logic, this.graphics);

        this.logic.startUpdateLoop();
        this.graphics.renderFrames();
    }

    Core.prototype.resources = null;
    Core.prototype.logic = null;
    Core.prototype.graphics = null;
    Core.prototype.controls = null;

    return Core;
});