define(['./object'], function (Parent) {
    function TreeObject(objects, x, y) {
        Parent.call(this, objects, x, y); //parent init
    }

    TreeObject.prototype = Object.create(Parent.prototype);
    TreeObject.prototype.type = 'TreeObject';
    TreeObject.prototype.spriteType = 'TreeObjectSprite';

    return TreeObject;
});