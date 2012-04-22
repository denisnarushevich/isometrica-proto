loader.use("tile.js");
loader.use("objects.js");

g.world = {
	waterLevel: 0,
	gridPoints: [],
	hash: [],
	tiles: [],
	//get point of grid, with set height. slopes of terrain shouldnt exceed 45 degrees.
	//This realisation is using many octaves, to have realistic view of terrain contour, coastline.
	//but because at the same time we need it to have smooth slopec <45Deg, there's a drawback - its too flat
	//height varies only from -16 to 16. can't afford anymore, because then there will be cliffs.
	//it would be good to invent something better then this aproach, with smooth slopes  and different landscape
	getGridPoint: function(x, y){
		//return 1;
		//if (this.gridPoints[x] && this.gridPoints[x][y]) return this.gridPoints[x][y];
		//if (!this.gridPoints[x]) this.gridPoints[x] = [];
		
		var land = 0, island = 0;
		
		land += Simplex.noise2d(x / 512, y / 512) / 2; //noisemap of continets
		land += Simplex.noise2d(x / 256, y / 256) / 4; //of smaler lands
		land += Simplex.noise2d(x / 128, y / 128) / 8;  //...
		land += Simplex.noise2d(x / 64, y / 64) / 16; //...
		land += Simplex.noise2d(x / 32, y / 32) / 32; //...
		land += Simplex.noise2d(x / 16, y / 16) / 64; //...
		land += Simplex.noise2d(x / 8, y / 8) / 64; //small details
		
		island += Simplex.noise2d(x / 64, y / 64) / 10;
		island += Simplex.noise2d(x / 32, y / 32) / 20;
		island += Simplex.noise2d(x / 16, y / 16) / 40;
		island += Simplex.noise2d(x / 8, y / 8) / 40;
		
		return (0.8*land + 0.2*island) * 16;
	},
	getTile: function(x, y){
		if (this.hash[x] && this.hash[x][y]) return this.hash[x][y];
		if (!this.hash[x]) this.hash[x] = [];
		
		var tile = this.hash[x][y] = new g.Tile(x, y);
		this.tiles.push(tile);
		
		//delete old tile
		if (this.tiles.length > 10240){
			//deleting references
			var deleteTile = this.tiles.shift();
			delete this.hash[deleteTile.x][deleteTile.y];
		}
		
		return tile;
	}
}