define(['./views/loaderView'], function (View) {
    var Loader = function (rootNode, resources) {
        this.resources = resources;
        this.view = new View();
        this.view.render(rootNode);
    };

    Loader.prototype.resources = null;
    Loader.prototype.view = null;

    Loader.prototype.loadResources = function (callback) {
        var loader = this;
        this.resources.load(function (progress, name) {
            loader.view.setProgress(progress);
            loader.view.setText(name)
        }, function () {
            callback();
        });
    };

    return Loader;
});