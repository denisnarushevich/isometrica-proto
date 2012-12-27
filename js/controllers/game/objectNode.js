define(['./node', './sprites', './spriteNode'], function (Node, sprites, SpriteNode) {
    function ObjectNode(object) {
        Node.call(this); //call parent

        this.position = new Utils.Math.Vec2(0, 0);
        this.object = object;
    }

    var p = ObjectNode.prototype = Object.create(Node.prototype);

    p.type = 'ObjectNode';
    p.object = null;
    p.position = null;

    p.addObjectSpriteNodes = function(){
        this.addChild(new SpriteNode(new sprites.TreeSprite()));
    }

    return ObjectNode;
});