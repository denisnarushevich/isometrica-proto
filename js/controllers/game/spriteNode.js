define(['./node', './assets'], function(Node, assets){
    function SpriteNode (sprite){
        Node.call(this);

        this.sprite = sprite;
    }

    var p = SpriteNode.prototype = Object.create(Node.prototype);

    p.sprite = null;
    p.type = 'SpriteNode';

    p.setParent = function(parent){
        Node.prototype.setParent.call(this, parent);
        this.position = parent.position;
    }

    return SpriteNode;
});