define(['./gridPoint'], function (GridPoint) {
    var Grid = function (zValue) {
        this.zValue = zValue;
        this.gridPoints = [];
        this.gridPointsStack = [];
    };

    Grid.prototype.zValue = null;
    Grid.prototype.waterLevel = 0;
    Grid.prototype.spacing = new Int8Array([45, 45, 8]);
    Grid.prototype.gridPoints = null;
    Grid.prototype.gridPointsStack = null;

    Grid.prototype.getPoint = function (x, y) {
        //check and return if gridpoint exists in cache
        if (this.gridPoints[x] && this.gridPoints[x][y]) return this.gridPoints[x][y];

        //make sure that current X is array of Ys
        if (!this.gridPoints[x]) this.gridPoints[x] = [];

        //cache new gridpoint
        var gp;
        this.gridPointsStack.push(this.gridPoints[x][y] = gp = new GridPoint(this, x, y));

        //fifo
        if(this.gridPointsStack.length > 20000){
            var gpOld = this.gridPointsStack.shift();
            delete this.gridPoints[gpOld.getX()][gpOld.getY()];
        }

        return gp;
    };

    Grid.prototype.getValue = function(x, y){
        var x0 = Math.floor(x), y0 = Math.floor(y);

        var p1 = this.getPoint(x0, y0).getZ();
        var p2 = this.getPoint(x0, y0 + 1).getZ();
        var p3 = this.getPoint(x0 + 1, y0).getZ();
        var p4 = this.getPoint(x0 + 1, y0 + 1).getZ();

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
            return i2 * (1 - yf) + i1 * yf;
        else
            return i1 * (1 - yf) + i2 * yf;
    }

    return Grid;
});


