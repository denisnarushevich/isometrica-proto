define(['gridPoint'], function(gridPoint){
  return {
    spacing: [45, 45, 8],
    length: 0,
    gridPoints: [],
    getGridPoint: function(x, y){
      //lazy cache limiter
      if ( this.length > 20000 ) {
        this.gridPoints = [];
        this.length = 0;
      }
      
      //check if gridpoint exists in cache
      if (this.gridPoints[x] && this.gridPoints[x][y]) return this.gridPoints[x][y];
      
      //make sure that current X is array of Ys
      if (!this.gridPoints[x]) this.gridPoints[x] = [];
      
      this.length++;
      
      //return new gridpoint, cache it and initialise with X & Y
      return this.gridPoints[x][y] = Object.create(gridPoint).setX(x).setY(y);
    }
  }
});


