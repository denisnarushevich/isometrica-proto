define(['./gridPoint'], function (GridPoint) {
    var Grid = function (world, zValue) {
        this.zValue = zValue;
        this.gridPoints = [];
        this.gridPointsStack = [];
        this.world = world;
    };

    Grid.prototype.world = null;
    Grid.prototype.zValue = null;
    Grid.prototype.spacing = new Int8Array([45, 45, 8]);
    Grid.prototype.gridPoints = null;
    Grid.prototype.gridPointsStack = null;

    Grid.prototype.getPoint = function (x, y) {
        var gp, gps = this.gridPoints;

        //check and return if gridpoint exists in cache
        if (gps[x] && (gp = gps[x][y])) return gp;

        //make sure that current X is array of Ys
        if (!gps[x]) gps[x] = [];

        //cache new gridpoint
        this.gridPointsStack.push(gps[x][y] = gp = new GridPoint(this, x, y));

        //fifo
        if (this.gridPointsStack.length > 20000) {
            var gpOld = this.gridPointsStack.shift();
            delete gps[gpOld.getX()][gpOld.getY()];
        }

        return gp;
    };

    Grid.prototype.getValue = function (x, y) {
        var x0 = x | 0,
            y0 = y | 0,
            p1 = this.getPoint(x0, y0).getZ(),
            p2 = this.getPoint(x0, y0 + 1).getZ(),
            p3 = this.getPoint(x0 + 1, y0).getZ(),
            p4 = this.getPoint(x0 + 1, y0 + 1).getZ(),
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
    };

    return Grid;
});


