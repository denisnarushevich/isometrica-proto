define(['caat'], function (CAAT) {
    function Viewport(graphics, containerElement, viewPosition) {
        var canvas = document.createElement('canvas');

        containerElement.appendChild(canvas);

        var director =new CAAT.Director().initialize(100, 100, canvas);

        var scene=     director.createScene();

        var circle=    new CAAT.ShapeActor().
            setLocation(20,20).
            setSize(60,60).
            setFillStyle('#ff0000').
            setStrokeStyle('#000000');

        scene.addChild(circle);



        director.loop();
        /*
        this.containerElement = containerElement;

        this.size = new Int16Array(2);

        this.graphics = graphics;
        this.scene = new Scene(this, viewPosition);

        this.renderer = new Renderer(containerElement);
        this.sprites = new Sprites(this, graphics.images);

        this.layers = {};
        this.layers.tiles = this.renderer.createLayer();
        this.layers.objects = this.renderer.createLayer();*/
    }

    ;

    Viewport.prototype.containerElement = null;
    Viewport.prototype.graphics = null;
    Viewport.prototype.scene = null;
    Viewport.prototype.renderer = null;
    Viewport.prototype.sprites = null;
    Viewport.prototype.scene = null;
    Viewport.prototype.layers = null;

    Viewport.prototype.updateSize = function () {
        if (this.size[0] != this.containerElement.clientWidth || this.size[1] != this.containerElement.clientHeight) {
            this.size[0] = this.containerElement.clientWidth;
            this.size[1] = this.containerElement.clientHeight;

            this.scene.setSize(this.size);
            this.renderer.setSize(this.size);
        }
        ;

    };

    p.initScene = function(){
        var at = [this.position.x | 0, this.position.y | 0],
            atX = at[0],
            atY = at[1],
            leni, lenj,
            tiles = this.graphics.logic.world.tiles,
            size = this.size,
            visibleTilePositions = this.visibleTilePositions = [],
            sprites = this.sprites,
            tile, sprite, offset,
            visibleTileSprites = [],
            count = 0,
            x, y;

        //from "at" tile in center of the screen loop is going level by level
        //increasing XxY area of tileModels.
        //tileModels outside of the screen are not drawn.
        //loop exits when there was no new tileModels for last level.
        for (var end, level = 0; !end; level++) {
            end = true;
            for (x = atX - level, leni = atX + level; x <= leni; x++) {
                for (y = atY - level, lenj = atY + level; y <= lenj; y++) {
                    if (x > atX - level && x < atX + level && y > atY - level && y < atY + level) continue; //skiping tileModels of previous levels

                    tile = tiles.getTile(x, y);

                    //if no tile, e.g. it's outside world border, draw dummy water tile
                    if (tile) {
                        sprite = sprites.createSpriteFor(tile);
                        sprite.setOriginOffset(this.coordinatesTransform(x, y, tile.position.z));
                    } else {
                        sprite = new OutworldTileSprite(sprites);
                        sprite.setOriginOffset(this.coordinatesTransform(x, y, tiles.world.waterLevel));
                    }

                    offset = sprite.getOffset();

                    //check rect intersection of tile image and window
                    if (offset[0] > size[0] || offset[0] < -sprite.size[0] || offset[1] > size[1] || offset[1] < -sprite.size[1]) continue;

                    if(tile)
                        visibleTilePositions[count] = tile.position;
                    visibleTileSprites[count] = sprite;
                    count++;
                    end = false;
                }
            }
        }

        return visibleTileSprites;
    };

    Viewport.prototype.render = function () {

        /*
        this.updateSize();

        var i, tiles = this.scene.getTiles(),
            objects = this.scene.getObjects(),
            layers = this.layers,
            renderer = this.renderer,
            tilesLayer = layers.tiles,
            objectsLayer = layers.objects,
            sprite;

        this.renderer.clearLayer(layers.tiles);

        for (i = 0, tilesLen = tiles.length; i < tilesLen; i++)
            renderer.drawSprite(tilesLayer, tiles[i]); //tile layer

        renderer.clearLayer(objectsLayer);

        for (i = 0, objectsLen = objects.length; i < objectsLen; i++) //~5ms
            renderer.drawSprite(objectsLayer, objects[i]); //object layer*/

        //renderer.renderLayers();

    };

    return Viewport;
});