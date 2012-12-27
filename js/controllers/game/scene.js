define(['./config', './tileNode', './renderer'], function (config, TileNode, Renderer) {

    function Scene(viewport) {
        this.position = viewport.position;
        this.size = viewport.size;
        this.viewport = viewport;
        this.renderer = new Renderer(viewport.containerElement);
        this.layer = this.renderer.createLayer();
    }

    var p = Scene.prototype;

    p.position = null;
    p.size = null;
    p.viewport = null;

    p.addVisibleTileNodes = function () {
        var atX = this.position.x | 0,
            atY = this.position.y | 0,
            count = 0,
            tiles = this.viewport.graphics.logic.world.tiles,
            viewportSize = this.size,
            children = this.children = [],
            rows, x0, y0, i, j, x, y, tile, offset, sprite, tileNode;

        rows = Math.ceil(viewportSize[0] / config.TILE_IMG_W); //half of number of all rows

        //coordinates of most left vertical row of tiles.
        x0 = atX - Math.ceil(rows / 2 + 1);
        y0 = atY - ((rows / 2 + 1) | 0);

        //get tiles for each row.
        for (i = 0, i1 = rows * 2 + 3; i < i1; i++) {

            //coordinates of center tile of row
            x1 = x0 + Math.ceil(i / 2);
            y1 = y0 + (i / 2) | 0;

            //get tiles over x0,y0 of row
            for (j = 0; ; j++) {
                //up
                tile = tiles.getTile(x1 - j, y1 + j);
                position2D = new Utils.Math.Vec2(0, 0);

                this.coordinatesTransform(tile.position, position2D);

                if (position2D.y > viewportSize[1] || position2D.y < -config.TILE_IMG_H)
                    break;

                tileNode = new TileNode(tile);
                tileNode.position = position2D;
                tileNode.parent = this;
                children[count++] = tileNode;
            }

            //tiles below x0,y0
            for (j = 1; ; j++) { // j = 1, because 0 is already drawn by upper part's loop
                tile = tiles.getTile(x1 + j, y1 - j);
                position2D = new Utils.Math.Vec2(0, 0);
                this.coordinatesTransform(tile.position, position2D);

                if (position2D.y > viewportSize[1] || position2D.y[1] < -config.TILE_IMG_H)
                    break;

                tileNode = new TileNode(tile);
                tileNode.position = position2D;
                tileNode.parent = this;
                children[count++] = tileNode;
            }
        }
    }

    p.coordinatesTransform = function (vector3, vector2) {
        var angle = Math.PI / -4,
            cosValue = Math.cos(angle),
            sinValue = Math.sin(angle);

        x = (vector3.x - this.position.x) * config.TILE_L;
        y = (vector3.y - this.position.y) * config.TILE_W;
        z = vector3.z * config.TILE_H;

        vector2.x = 1 + x * cosValue - y * sinValue + this.size[0] / 2;
        vector2.y = 1 - ( x * sinValue + y * cosValue - this.size[1] ) / 2 - z;
    }

    p.buildScene = function () {
        this.addVisibleTileNodes();
        var tileNodes = this.children;

        var tileNodesCount = tileNodes.length;
        for (var i = 0; i < tileNodesCount; i++) {
            tileNodes[i].addTileSpriteNodes();
            tileNodes[i].addObjectNodes();
        }
    }

    p.renderNode = function(node){
        if(node.type === 'SpriteNode'){
            this.renderer.drawSprite(this.layer, node);
        }else{
            var children = node.children,
                childrenCount = children.length,
                i;

            for(i = 0; i < childrenCount; i++){
                this.renderNode(children[i]);
            }
        }
    }

    p.render = function(){
        this.renderNode(this);
        this.renderer.renderLayers();
    }

    return Scene;
});