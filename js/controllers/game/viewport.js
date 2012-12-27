define(['./config', './scene'], function (config, Scene) {
    function Viewport(graphics, containerElement, position) {
        this.position = position;

        this.containerElement = containerElement;

        this.size = new Int16Array(2);

        this.graphics = graphics;

        this.scene = new Scene(this);
    }

    var p = Viewport.prototype;

    p.position = null;
    p.size = null;
    p.containerElement = null;
    p.graphics = null;
    p.scene = null;

    p.updateSize = function () {
        if (this.size[0] != this.containerElement.clientWidth || this.size[1] != this.containerElement.clientHeight) {
            this.size[0] = this.containerElement.clientWidth;
            this.size[1] = this.containerElement.clientHeight;

            this.scene.renderer.setSize(this.size);
        }
        ;

    };

    p.render = function(){
        this.updateSize();

        this.scene.buildScene();
        this.scene.render();
    }

    p.getObjects = function () {
        var tilePositions = this.visibleTilePositions,
            objects = this.graphics.logic.world.objects,
            sprites = this.sprites,
            visibleObjects = [],
            position, i, j, tileObjects, object, pos, sprite, leni, lenj, count = 0;

        for (i = 0, leni = tilePositions.length; i < leni; i++) {
            position = tilePositions[i];
            tileObjects = objects.getObjectsInTile(position.x, position.y);

            for (j = 0, lenj = tileObjects.length; j < lenj; j++) {
                object = tileObjects[j];
                pos = object.getPosition();

                sprite = sprites.createSpriteFor(object);
                sprite.setOriginOffset(this.coordinatesTransform(pos, []));

                visibleObjects[count++] = sprite;
            }
        }
        ;

        //sorting by depth, where depth is y screen offset coordinate.
        visibleObjects.sort(function (obj1, obj2) {
            return obj1.zIndex < obj2.zIndex ? -1 : 1;
        });

        return visibleObjects;
    };

    return Viewport;
});