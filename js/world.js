define(['tiles', 'grid'], function(tiles, grid){

  return g.world ? g.world : g.world = {
    waterLevel: 0,
    tiles: tiles,
    grid: grid,

    getGridPoint: function(x, y){
      return this.grid.getGridPoint(x, y).getZ();
    },
    getTile: function(x, y){
      return this.tiles.getTile(x, y);
    }
  }
});