define(['./vector3'], function (Vector3) {
    var Grid = function (world, zValue) {
        this.zValue = zValue;
        this.world = world;
        this.worldSizeY = world.size.y;
        this.zValues = new Array(world.size.x * world.size.y);
    };

    Grid.prototype.world = null;
    Grid.prototype.worldSizeY = null;
    Grid.prototype.zValue = null;
    Grid.prototype.zValues = null;
    Grid.prototype.spacing = new Int8Array([45, 45, 8]);

    Grid.prototype.getPoint = function (x, y) {
        var gp, gps = this.gridPoints;

        return new Vector3(x, y, this.getZValue(x, y));

        return gp;
    };

    Grid.prototype.getZValue = function (x, y) {
        var zs = this.zValues,
            index = x * this.worldSizeY + y,
            val = zs[index];

        if (val)return val;

        return zs[index] = this.zValue(x, y);
    };

    Grid.prototype.getValue = function (x, y) {
        var x0 = x | 0,
            y0 = y | 0,
            p1 = this.getZValue(x0, y0),
            p2 = this.getZValue(x0, y0 + 1),
            p3 = this.getZValue(x0 + 1, y0),
            p4 = this.getZValue(x0 + 1, y0 + 1),
            xf = Math.abs(x % 1),
            yf = Math.abs(y % 1),
            i1, i2; //linear interpol

        if (x < 0) {
            i1 = p3 * (1 - xf) + p1 * xf;
            i2 = p4 * (1 - xf) + p2 * xf;
        } else {
            i1 = p1 * (1 - xf) + p3 * xf;
            i2 = p2 * (1 - xf) + p4 * xf;
        }

        if (y < 0)
            return i2 * (1 - yf) + i1 * yf;
        else
            return i1 * (1 - yf) + i2 * yf;

        //above lines are commented because x and y always is >0
        //return (p3 * (1 - xf) + p1 * xf) * (1 - yf) + (p4 * (1 - xf) + p2 * xf) * yf;
    };

    return Grid;
});


