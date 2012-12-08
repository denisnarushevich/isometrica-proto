define(function () {
    function Controls(logic, viewport) {
        this.logic = logic;
        this.viewport = viewport;
        this.currentPointedPixel = new Utils.Math.Vec2(0, 0); //e.g. cursor position(pixel)
        this.control1 = false; //e.g. is left mouse button pressed or not
        this.control2 = false; //e.g. is right mouse button pressed or not
        this.bindDeviceToControls();
        this.sensitivity = 0.3;
    };

    Controls.prototype = {};

    Controls.prototype.logic = null;
    Controls.prototype.graphics = null;
    Controls.prototype.sensitivity = null;
    Controls.prototype.currentPointedPixel = null;
    Controls.prototype.previousPointedPixel = null;
    Controls.prototype.control1 = null;
    Controls.prototype.control2 = null;

    Controls.prototype.lastHovered = null;

    /**
     * it takes mouse coordinates and rotates them by -45 degree, then dividing x coordinate by 2.
     * this way we get mouse position in "isometric" coordinates.
     */
    Controls.prototype.transformPixelToPosition = function (pixel) {
        var x = pixel.x,
            y = pixel.y,
            angle45 = Math.PI / -4,
            cosOfAngle45 = Math.cos(angle45),
            sinOfAngle45 = Math.sin(angle45);

        return new Utils.Math.Vec2(
            x * cosOfAngle45 / 2 - y * sinOfAngle45,
            -( x * sinOfAngle45 / 2 + y * cosOfAngle45 )
        );
    };

    Controls.prototype.update = function () {
        if (this.control1) { //if left mouse button is pressed
            if(this.lastHovered)
                this.lastHovered.model.isPointed(false); //disable higliting

            if (this.previousPointedPixel) {
                var px0 = this.previousPointedPixel,
                    px1 = this.currentPointedPixel,
                    movedPos = this.transformPixelToPosition(new Utils.Math.Vec2(px1.x - px0.x, px1.y - px0.y));
                    playerPos = this.logic.world.player.position;

                movedPos.scale(this.sensitivity / 10);
                playerPos.sub(movedPos);
                px0.x = px1.x;
                px0.y = px1.y;
            } else {
                this.previousPointedPixel = new Utils.Math.Vec2(this.currentPointedPixel.x, this.currentPointedPixel.y);
            }
        } else {
            if (this.previousPointedPixel) //disabled map panning
                this.previousPointedPixel = null;

            this.detectHoveredTile();
        }
    };

    Controls.prototype.bindDeviceToControls = function(){
        controls = this;

        $(this.viewport.containerElement).bind('mousedown', function(){
            controls.control1 = true;
            $(document.body).css({
                cursor:'pointer'
            });
        });

        $(this.viewport.containerElement).bind('mouseup', function(){
            controls.control1 = false;
            $(document.body).css({
                cursor:'default'
            });
        });

        $(this.viewport.containerElement).bind('mouseout', function(){
           $(this).trigger('mouseup');
        });

        $(this.viewport.containerElement).bind('mousemove', function(event){
            controls.currentPointedPixel.x = event.pageX;
            controls.currentPointedPixel.y = event.pageY;
            controls.update();
        });
    };

    Controls.prototype.detectHoveredTile = function () {
        var tileSprites = this.viewport.scene.getTiles(), sprite;

        //if we have previos hovered, then we first check if its still hovered,
        //and avoid looping through all scene
        if (this.lastHovered && this.tileSpriteHitTest(this.lastHovered)) {
            //do nothing
        } else {
            if (this.lastHovered) this.lastHovered.model.isPointed(false);

            for (var i = 0; sprite = tileSprites[i]; i++) {
                if (this.tileSpriteHitTest(sprite)) {
                    if(sprite.model){
                        sprite.model.isPointed(true);
                        this.lastHovered = sprite;
                        break;
                    }
                }
            }
        }
    };

    Controls.prototype.tileSpriteHitTest = function (sprite) {
        //var canvas = window.tmpcnv ? window.tmpcnv : window.tmpcnv = document.createElement('canvas');
        //var context = window.tmpctx ? window.tmpctx : window.tmpctx = canvas.getContext('2d');
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        var offset = sprite.getOffset();
        var size = sprite.getSize();
        var mousePos = this.currentPointedPixel;

        //quick tile sprite bounding box hit test
        if (mousePos.x < offset[0] ||
            mousePos.y < offset[1] ||
            mousePos.x > offset[0] + size[0] ||
            mousePos.y > offset[1] + size[1]) return false;

        //more accurate tile sprite image hit test, by checking if pixel is alpha.
        canvas.width = size[0];
        canvas.height = size[1];

        var images = sprite.getImages();

        for (var i = 0; images[i]; i++) {
            context.drawImage(images[i], 0, 0);
        }

        if (context.getImageData(mousePos.x - offset[0], mousePos.y - offset[1], 1, 1).data[3] > 0) {
            return true;
        }
        ;

        return false;
    };

    return Controls;
});