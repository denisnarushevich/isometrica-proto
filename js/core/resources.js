define(['./images'], function (Images) {
    var Resources = function () {
        this.images = new Images;
    }

    Resources.prototype.images = null;

    Resources.prototype.load = function (progressHandler, callback) {
        var images = this.images;
        images.load(function () {
            progressHandler(images.loadProgress(), images.currentLoadingName());

            if (images.loaded()) callback();
        });
    };

    Resources.prototype.getImage = function (urn) {
        return this.images.getImage(urn);
    }

    return Resources;
});