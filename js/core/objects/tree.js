define(['./object'], function (Parent) {
    var Tree = function (objects, x, y) {
        Parent.call(this, objects, x, y); //parent init
    }

    Tree.prototype = Object.create(Parent.prototype);
    Tree.prototype.type = 'tree';
    Tree.prototype.typeName = 'tree';

    return Tree;
});