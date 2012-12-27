define(function(){
    function Node (){
        //this.children = [];
    }

    var p = Node.prototype;

    p.parent = null;
    p.children = null;

    p.addChild = function(child){
        if(this.children === null)
            this.children = [];

        child.setParent(this);
        this.children.push(child);
    }

    p.setParent = function(parent){
        this.parent = parent;
    }

    return Node;
});