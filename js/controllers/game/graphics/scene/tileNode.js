define(['../../assets'], function(assets){
   function TileNode (tile){
        this.position = new Utils.Math.Vec2(0, 0);
        this.images = [];
        this.objects = [];
   }

    var p = TileNode.prototype;

    p.parent = null;
    p.position = null;

    p.objects = null;
    p.images = null;

    p.fill = function(){
        this.images[0] = assets.getImage();
    }

    return TileNode;
});