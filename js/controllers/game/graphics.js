define(['./viewport'], function (Viewport) {
//define(['./scene', './renderer', './sprites'], function (Scene, Renderer, Sprites) {

    function Graphics(logic, images) {
        this.logic = logic;
        this.images = images;
        this.viewports = [];
    }

    ;

    Graphics.prototype.logic = null;
    Graphics.prototype.images = null;
    Graphics.prototype.viewports = null;

    Graphics.prototype.createViewport = function (containerElement, viewPosition) {
        var vps = this.viewports;
        return vps[vps.length] = new Viewport(this, containerElement, viewPosition);
    };

    Graphics.prototype.renderViewports = function () {
        var vps = this.viewports;
        for (var i = 0; i < vps.length; i++)
            vps[i].render();
        return this;
    };

    Graphics.prototype.startRenderLoop = function () {
        this.renderViewports();
        var graphics = this;
        window.requestAnimFrame(function () {
            graphics.startRenderLoop();
        });
    };

    return Graphics;
});