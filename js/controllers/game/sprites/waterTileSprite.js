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
    p.size = [64, 47];
    p.origin = [0, 24];
    p.clip = [0, 0];

    p.getImages = function(){
        //var d = Math.sin( Math.round(new Date().getTime()/4) * Math.PI/180);
        var d = Math.round(this.sprites.viewport.graphics.logic.date.getTime()/800)%2;
        if( d > 0){
            this.clip[1] = 64;
        }else{
            this.clip[1] = 0;
        }
        if(this.model.position.deep > 0)
            this.clip[0] = 0;
        else
            this.clip[0] = 64;
        var images = [this.sprites.images.getImage('terrain/sea/sea')];

      return images;
    };

    return WaterTileSprite;
});
