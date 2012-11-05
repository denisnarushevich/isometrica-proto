define(['./tree'], function (parent) {
    var tree1 = function (objects, x, y) {
        parent.call(this, objects, x, y);
    }

    tree1.prototype = Object.create(parent.prototype);
    tree1.prototype.name = 'tree1';

    return tree1;
});