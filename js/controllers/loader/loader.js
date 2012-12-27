define(['views/loaderView', '../game/assets'], function (View, assets) {
    var Loader = function () {
        this.view = new View();
    };

    var p = Loader.prototype;

    p.resources = null;
    p.view = null;

    p.loadAssets = function (callback) {
        var loader = this;
        assets.load(function (progress, name) {
            loader.view.setProgress(progress);
            loader.view.setText(name)
        }, function () {
            callback(assets);
        });
    };

    p.renderView = function (rootNode) {
        this.view.el = rootNode;
        this.view.render();
    };

    return Loader;
});