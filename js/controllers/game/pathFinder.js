define(['lib/astar/astar'], function (astar) {
    var pathFinder = Object.create(astar);

    pathFinder.findPath = function (sourceTile, destinationTile, isWall) {
        var tiles = sourceTile.tiles;
        var nodes = astar.search.call(this, sourceTile.position.x, sourceTile.position.y, destinationTile.position.x, destinationTile.position.y, function (node) {
            return isWall(tiles.getTile(node.x, node.y));
        }, function (node) {
            return tiles.getTile(node.x, node.y).slopeId == 2222 ? 1 : 2;
        });

        var path = [];
        for (var i in nodes) {
            path.push(tiles.getTile(nodes[i].x, nodes[i].y));
        }
        return path;
    };

    return pathFinder;
});