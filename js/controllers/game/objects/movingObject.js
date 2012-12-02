define(['./object'], function(Parent){
    function MovingObject(objects, x, y){
        Parent.call(this, objects, x, y)
    };

    MovingObject.prototype = Object.create(Parent.prototype);
    MovingObject.prototype.type = "MovingObject";

    MovingObject.prototype.update = function(){
        Parent.prototype.update.call(this);

        //update Z coordinate for current position.
        var pos = this.getPosition();
        pos.setZ(this.objects.world.grid.getValue(pos.getX(), pos.getY()));
    }

    return MovingObject;
});