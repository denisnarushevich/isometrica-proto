define(['./vector3'], function (Vec3) {
    var GP = function (grid, x, y) {
        this.grid = grid;
        this.setX(x);
        this.setY(y);
    };

    GP.prototype = Object.create(Vec3.prototype);

    GP.prototype.z = null;
    //GP.prototype.z0 = null; //pure grid point value, without added waterLevel
    //GP.prototype.w = null; //water height\depth on given tile


    GP.prototype.getZ = function () {
        if (typeof(this.z) == 'number') return this.z;
        return this.z = this.grid.zValue(this.getX(), this.getY());
    };

/*    //water depth on given point
    GP.prototype.getW = function () {
        if (typeof(this.w) == 'number') return this.w;

        var z0 = this.getZ0();
        return this.w = z0 <= this.grid.waterLevel ? this.grid.waterLevel - z0 + 1 : 0;
    }

    //grid point Z value, with added water level.
    GP.prototype.getZ = function () {
        if (typeof(this.z) == 'number') return this.z;

        var z0 = this.getZ0();
        return this.z = z0 <= this.grid.waterLevel ? this.grid.waterLevel : z0;
    }*/

    return GP;
});


