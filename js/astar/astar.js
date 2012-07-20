define(['./binaryHeap'], function(BinaryHeap){
  return {
    getNode: function(x, y){
      if (this.nodes[x] && this.nodes[x][y])
        return this.nodes[x][y];
      
      if (!this.nodes[x])
        this.nodes[x] = [];
      
      var that = this;
      
      return this.nodes[x][y] = {
        x: x,
        y: y,
        f: 0,
        g: 0,
        h: 0,
        cost: 1,
        visited: false,
        closed: false,
        parent: null,
        isWall: function(){
          return that.isWall(x, y);
        }
      };
    },
    isWall: function(x, y){
      return false;
    },
    search: function(x1, y1, x2, y2) {
      this.nodes = [];
      
      var openHeap = new BinaryHeap(function(node) { 
        return node.f; 
      });

      openHeap.push(this.getNode(x1, y1));

      while(openHeap.size() > 0) {

        // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
        var currentNode = openHeap.pop();

        // End case -- result has been found, return the traced path.
        if(currentNode === this.getNode(x2, y2)) {
          var curr = currentNode;
          var ret = [];
          while(curr.parent) {
            ret.push(curr);
            curr = curr.parent;
          }
          return ret.reverse();
        }

        // Normal case -- move currentNode from open to closed, process each of its neighbors.
        currentNode.closed = true;

        // Find all neighbors for the current node. Optionally find diagonal neighbors as well (false by default).
        var neighbors = this.neighbors(currentNode);

        for(var i=0, il = neighbors.length; i < il; i++) {
          var neighbor = neighbors[i];

          if(neighbor.closed || neighbor.isWall()) {
            // Not a valid node to process, skip to next neighbor.
            continue;
          }

          // The g score is the shortest distance from start to current node.
          // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
          var gScore = currentNode.g + neighbor.cost;
          var beenVisited = neighbor.visited;

          if(!beenVisited || gScore < neighbor.g) {

            // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
            neighbor.visited = true;
            neighbor.parent = currentNode;
            neighbor.h = neighbor.h || this.manhattan(neighbor.x, neighbor.y, x2, y2);
            neighbor.g = gScore;
            neighbor.f = neighbor.g + neighbor.h;

            if (!beenVisited) {
              // Pushing to heap will put it in proper place based on the 'f' value.
              openHeap.push(neighbor);
            }
            else {
              // Already seen the node, but since it has been rescored we need to reorder it in the heap
              openHeap.rescoreElement(neighbor);
            }
          }
        }
      }

      // No result was found - empty array signifies failure to find path.
      return [];
    },
    manhattan: function(x1, y1, x2, y2) {
      // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html

      var d1 = Math.abs (x2 - x1);
      var d2 = Math.abs (y2 - y1);
      return d1 + d2;
    },
    neighbors: function(node) {
      var ret = [];
      var x = node.x;
      var y = node.y;

      // West
      ret.push(this.getNode(x-1, y));

      // East
      ret.push(this.getNode(x+1, y));

      // South
      ret.push(this.getNode(x, y-1));

      // North
      ret.push(this.getNode(x, y+1));

      return ret;
    }
  };
});