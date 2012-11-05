define(['./object'], function(Parent){
    MovingObject = function(objects, x, y){
        Parent.call(this, objects, x, y)
    };

    MovingObject.prototype = Object.create(Parent.prototype);

    MovingObject.prototype.update = function(){
        Parent.prototype.update.call(this);

        //update Z coordinate for current position.
        var pos = this.getPosition();
        pos.setZ(this.objects.world.grid.getValue(pos.getX(), pos.getY()));
    }

    return MovingObject;
});