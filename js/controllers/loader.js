define(['views/loaderView', './loader/assets'], function (View, Assets) {
    var Loader = function () {
        this.assets = new Assets();
        this.view = new View();
    };

    var p = Loader.prototype;

    p.resources = null;
    p.view = null;

    p.loadAssets = function (callback) {
        var loader = this;
        this.assets.load(function (progress, name) {
            loader.view.setProgress(progress);
            loader.view.setText(name)
        }, function () {
            callback(loader.assets);
        });
    };

    p.renderView = function (rootNode) {
        this.view.el = rootNode;
        this.view.render();
    };

    return Loader;
});