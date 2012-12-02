define(['./treeObject'], function (Parent) {
    function Tree2Object(objects, x, y) {
        Parent.call(this, objects, x, y);
    }

    Tree2Object.prototype = Object.create(Parent.prototype);
    Tree2Object.prototype.type = 'Tree2Object';
    Tree2Object.prototype.name = 'Tree2';

    return Tree2Object;
});