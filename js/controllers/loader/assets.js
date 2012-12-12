define(['./images'], function (Images) {
    var Assets = function () {
        this.images = new Images();
    }

    var p = Assets.prototype;

    p.images = null;

    p.load = function (progressHandler, callback) {
        var images = this.images;
        images.load(function () {
            progressHandler(images.loadProgress(), images.currentLoadingName());

            if (images.loaded()) callback();
        });
    };

    p.getImage = function (urn) {
        return this.images.getImage(urn);
    }

    return Assets;
});