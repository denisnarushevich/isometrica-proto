define(['tiles', 'grid'], function(tiles, grid){

  return g.world ? g.world : g.world = {
    waterLevel: 0,
    tiles: tiles,
    grid: grid
  }
});