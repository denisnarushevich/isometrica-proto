define(['./tileSprite'], function (Parent) {
    function WaterTileSprite(sprites, model) {
        Parent.call(this, sprites, model);
    }

    ;

    var p = WaterTileSprite.prototype = Object.create(Parent.prototype);
    p.type = "WaterTileSprite";

    p.getImages = function(){
        var a, images = this.sprites.images, model = this.model;
      if(model.deepness === 0)
          a = [images.getImage('terrain/water/2222')];
        else
          a= [images.getImage('terrain/deepwater/2222')];

        if(model.isPointed()){
            a[1] = images.getImage('terrain/misc/highlite/2222');
        }

        return a;
    };

    return WaterTileSprite;
});