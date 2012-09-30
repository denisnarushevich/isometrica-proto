define(['./vector3'], function (Vec3) {
    var GP = function (grid, x, y) {
        this.grid = grid;
        this.setX(x);
        this.setY(y);
    };

    GP.prototype = Object.create(Vec3.prototype);

    GP.prototype.z = null;
    GP.prototype.z0 = null; //pure grid point value, without added waterLevel
    GP.prototype.w = null; //water height\depth on given tile


    GP.prototype.getZ0 = function () {
        var x = this.getX();
        var y = this.getY();

        if (typeof(this.z0) == 'number') return this.z0;
        else if (x % 1 || y % 1) {
            var x0 = Math.floor(x), y0 = Math.floor(y);

            var p1 = this.grid.getPoint(x0, y0).getZ();
            var p2 = this.grid.getPoint(x0, y0 + 1).getZ();
            var p3 = this.grid.getPoint(x0 + 1, y0).getZ();
            var p4 = this.grid.getPoint(x0 + 1, y0 + 1).getZ();

            var xf = Math.abs(x % 1);
            var yf = Math.abs(y % 1);

            var i1, i2; //linear interpol

            if (x < 0) {
                i1 = p3 * (1 - xf) + p1 * xf;
                i2 = p4 * (1 - xf) + p2 * xf;
            } else {
                i1 = p1 * (1 - xf) + p3 * xf;
                i2 = p2 * (1 - xf) + p4 * xf;
            }

            if (y < 0)
                this.z0 = i2 * (1 - yf) + i1 * yf;
            else
                this.z0 = i1 * (1 - yf) + i2 * yf;
        } else {
            this.z0 = this.grid.zValue(x, y);
        }

        return this.z0;
    };

    //water depth on given point
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
    }

    return GP;
});


