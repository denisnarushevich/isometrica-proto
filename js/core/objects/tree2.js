define(['./tree'], function (Parent) {
    var Tree6 = function (objects, x, y) {
        Parent.call(this, objects, x, y);
    }

    Tree6.prototype = Object.create(Parent.prototype);
    Tree6.prototype.name = 'tree6';

    return Tree6;
});