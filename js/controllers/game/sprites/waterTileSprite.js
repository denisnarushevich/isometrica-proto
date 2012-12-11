define(['./sprite'], function(Parent){
   function WaterTileSprite(sprites, model) {
       Parent.call(this, sprites, model);
   };

    var p = WaterTileSprite.prototype = Object.create(Parent.prototype);

    p.clips = [
        [0, 0],
        [80, 0]
        [0, 47],
        [80, 47]
    ];

    p.type = "WaterTileSprite";
    p.size = [64, 31];
    p.origin = [0, 16];
    p.clip = [0, 0];

    p.getImages = function(){
        var d = Math.sin( Math.round(new Date().getTime()/4) * Math.PI/180);
        if( d > 0){
            this.clip[0] = 80;
        }else{
            this.clip[0] = 0;
        }
        if(this.model.position.deep > 0)
            this.clip[1] = 47;
        else
            this.clip[1] = 0;
        var images = [this.sprites.images.getImage('terrain/sea/sea')];

      return images;
    };

    return WaterTileSprite;
});
