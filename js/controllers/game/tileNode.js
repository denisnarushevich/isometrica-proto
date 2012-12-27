define(['./node', './sprites', './spriteNode', './objectNode'], function(Node, sprites, SpriteNode, ObjectNode){
   function TileNode (tile){
       Node.call(this); //call parent

       this.position = new Utils.Math.Vec2(0, 0);
       this.tile = tile;
   }

    var p = TileNode.prototype = Object.create(Node.prototype);

    p.position = null;
    p.tile = null;
    p.type = 'TileNode';

    p.addTileSpriteNodes = function(){
        var tile = this.tile,
            type = tile.type,
            sprite;

        if(type === 'water'){
            sprite = new sprites.CoastSeaSprite();
            sprite.frame = tile.slopeId;

            this.addChild(new SpriteNode(sprite));
        }else if(type === 'coast'){
            sprite = new sprites.GrassLandSprite();
            sprite.frame = tile.slopeId;

            this.addChild(new SpriteNode(sprite));

            sprite = new sprites.CoastSeaSprite();
            sprite.frame = tile.slopeId;

            this.addChild(new SpriteNode(sprite));
        }else{
            sprite = new sprites.GrassLandSprite();
            sprite.frame = tile.slopeId;

            this.addChild(new SpriteNode(sprite));
        }
    }

    p.addObjectNodes = function(){
        var objects = this.tile.getObjects(),
            objectsCount = objects.length,
            i, objectNode, object;

        for(i = 0; i < objectsCount; i++){
            object = objects[i];
            objectNode = new ObjectNode(object);
            this.parent.coordinatesTransform(object.position, objectNode.position = new Utils.Math.Vec2(0,0));
            objectNode.addObjectSpriteNodes();
            this.addChild(objectNode);
        }
    }

    return TileNode;
});