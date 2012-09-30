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

    return Grid;
});


