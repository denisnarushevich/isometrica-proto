define(['./treeObject'], function (Parent) {
    function Tree1Object(objects, x, y) {
        Parent.call(this, objects, x, y);
    }

    Tree1Object.prototype = Object.create(Parent.prototype);
    Tree1Object.prototype.type = 'Tree1Object';
    Tree1Object.prototype.name = 'Tree1';

    return Tree1Object;
});