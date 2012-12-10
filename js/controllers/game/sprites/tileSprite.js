define(['./sprite'], function (Parent) {
    function TileSprite(sprites, model) {
        Parent.call(this, sprites, model);
        this.clip = this.clips[model.slopeId];
    }

    ;

    var p = TileSprite.prototype = Object.create(Parent.prototype);
    p.clips = {
        '2222':[0, 0],
        '2111':[80, 0],
        '2223':[160, 0],
        '2112':[240, 0],
        '2232':[320, 0],
        '2121':[400, 0],
        '2233':[480, 0],
        '2122':[560, 0],
        '2322':[0, 64],
        '2211':[80, 64],
        '2323':[160, 64],
        '2212':[240, 64],
        '2332':[320, 64],
        '2221':[400, 64],
        '2333':[480, 64],
        '2321':[560, 64],
        '2123':[0, 128],
        '2101':[80, 128],
        '2343':[160, 128]
    };
    p.clips = {
        '2222':[0, 0],
        '2111':[81, 0],
        '2223':[161, 0],
        '2112':[241, 0],
        '2232':[321, 0],
        '2121':[399, 0],
        '2233':[479, 0],
        '2122':[559, 0],
        '2322':[639, 0],
        '2211':[719, 0],
        '2323':[799, 0],
        '2212':[879, 0],
        '2332':[959, 0],
        '2221':[1039, 0],
        '2333':[1119, 0],
        '2321':[1197, 0],
        '2123':[1277, 0],
        '2101':[1358, 0],
        '2343':[1437, 0]
    }
    p.type = "TileSprite";
    p.size = [64, 47];
    p.origin = [0, 24];
    p.clip = [0, 0];

    TileSprite.prototype.getImages = function () {
        var model = this.model,
            imageAssets = this.sprites.images,
            slopeId = model.slopeId,
            images,
            type = model.type;

        if (type == 'coast')
            images = [imageAssets.getImage('terrain/grass/grass'),
                imageAssets.getImage('terrain/coast/coast')];
        else if (type == 'land')
            images = [imageAssets.getImage('terrain/grass/grass')];
        else if (type = 'water')
            if (model.position.deep > 0)
                images = [imageAssets.getImage('terrain/deepsea/deepsea')];
            else
                images = [imageAssets.getImage('terrain/sea/sea')];

        if (model.isPointedStatus)
            images[images.length] = imageAssets.getImage('terrain/cursor/cursor');

        return images;
    };

    return TileSprite;
});

