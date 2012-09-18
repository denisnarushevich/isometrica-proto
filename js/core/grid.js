define(['./gridPoint'], function(gridPoint){
  return {
    waterLevel: 0,
    spacing: [45, 45, 8],
    //diagonalSpacing: null,
    length: 0,
    gridPoints: [],
    init: function(){
      
    },
    getPoint: function(x, y){      
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
      
      //get and init gridpoint
      var gp = Object.create(gridPoint).setGrid(this).setX(x).setY(y);

      //return gp and cache it if its not inter-point. (with fractal part in the number)
      if ( !(x % 1) || !(y % 1) )   
        this.gridPoints[x][y] = gp

      return gp;
    }
  //    getDiagonalSpacing: function(){
  //      if(this.diagonalSpacing) return this.diagonalSpacing;
  //      return this.diagonalSpacing = Math.sqrt ( this.spacing[0] * this.spacing[0] + this.spacing[1] * this.spacing[1] );
  //    }
  }
});


