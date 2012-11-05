define(['jquery', './vector2'], function ($, Vec2) {
    function Controls(logic, graphics) {
        this.logic = logic;
        this.graphics = graphics;
        this.currentPointedPixel = new Vec2(0, 0); //e.g. cursor position(pixel)
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

    /**
     * it takes mouse coordinates and rotates them by -45 degree, then dividing x coordinate by 2.
     * this way we get mouse position in "isometric" coordinates.
     */
    Controls.prototype.transformPixelToPosition = function (pixel) {
        var x = pixel.getX(), y = pixel.getY(), PI = Math.PI;

        return new Vec2(
            x * Math.cos(PI / -4) / 2 - y * Math.sin(PI / -4),
            -( x * Math.sin(PI / -4) / 2 + y * Math.cos(PI / -4) )
        );
    };

    Controls.prototype.update = function () {
        if (this.control1) { //if left mouse button is pressed
            if (this.previousPointedPixel) {
                var px0 = this.previousPointedPixel,
                    px1 = this.currentPointedPixel,
                    movedPos = this.transformPixelToPosition(new Vec2(px1.getX() - px0.getX(), px1.getY() - px0.getY()));
                    playerPos = this.logic.player.getPosition();

                playerPos.setX(playerPos.getX() - movedPos.getX() * this.sensitivity / 10);
                playerPos.setY(playerPos.getY() - movedPos.getY() * this.sensitivity / 10);
                this.previousPointedPixel.setX(this.currentPointedPixel.getX());
                this.previousPointedPixel.setY(this.currentPointedPixel.getY());
            } else {
                this.previousPointedPixel = new Vec2(this.currentPointedPixel.getX(), this.currentPointedPixel.getY());
            }
        } else {
            if (this.previousPointedPixel)
                this.previousPointedPixel = null;
        }
    };

    Controls.prototype.bindDeviceToControls = function(){
        controls = this;

        $(window).bind('mousedown', function(){
            controls.control1 = true;
            $(document.body).css({
                cursor:'pointer'
            });
        });

        $(window).bind('mouseup', function(){
            controls.control1 = false;
            $(document.body).css({
                cursor:'default'
            });
        });

        $(window).bind('mousemove', function(event){
            controls.currentPointedPixel.setX(event.pageX);
            controls.currentPointedPixel.setY(event.pageY);
            //console.log(controls.transformPixelToPosition(controls.currentPointedPixel).toString());
            controls.update();
        });
    };

    return Controls;

    var controls = {
        mouseAtWhenPressed:[0, 0],
        mapAtWhenPressed:[0, 0],
        sensitivity:1,
        tileSideLen:null,
        lastHovered:null
    };

    controls.init = function () {
        $(window).bind('mousedown', function (event) {
            controls.downHandler(event);
        });

        $(window).mousemove(function (event) {
            controls.detectHoveredTile([event.pageX, event.pageY]);
        });

        this.tileSideLen = this.transformMousePosition(64, 0)[0]; //actually I don't know exactly(mathematically) why it works', but if tile image is in right proportions, the its ok.
    };

    controls.downHandler = function (event) {
        this.mouseAtWhenPressed = this.transformMousePosition(event.pageX, event.pageY)
        this.mapAtWhenPressed = [logic.player.position.getX(), logic.player.position.getY()];

        $(window).bind('mousemove.scroll', function (event) {
            controls.moveHandler(event);
        });

        $(window).bind('mouseup', function (event) {
            controls.upHandler(event);
        });

        //setting cursor
        $('body').css({
            cursor:'pointer'
        });

        return false; //to avoid text and image selection
    };

    controls.upHandler = function (event) {
        $(window).unbind('mousemove.scroll');
        $(window).unbind('mouseup');

        //UNsetting cursor
        $('body').css({
            cursor:'initial'
        });
    };

    controls.moveHandler = function (event) {
        //current position of mouse pointer on screen in screen pixel coordinates
        var currentAt = this.transformMousePosition(event.pageX, event.pageY);

        //distance from click point, in screen pixel coordinates
        var scrolledFor = [
            ( currentAt[0] - this.mouseAtWhenPressed[0] ) / this.tileSideLen * this.sensitivity,
            ( currentAt[1] - this.mouseAtWhenPressed[1] ) / this.tileSideLen * this.sensitivity
        ];

        logic.player.position.setX(this.mapAtWhenPressed[0] - scrolledFor[0]).setY(this.mapAtWhenPressed[1] - scrolledFor[1]);
    };

    /**
     * it takes mouse coordinates and rotates them by -45 degree, then dividing x coordinate by 2.
     * this way we get mouse position in "isometric" coordinates.
     */
    controls.transformMousePosition = function (x, y) {
        return [
            (x) * Math.cos(Math.PI / -4) / 2 - (y) * Math.sin(Math.PI / -4),
            -( (x) * Math.sin(Math.PI / -4) / 2 + (y) * Math.cos(Math.PI / -4) ),
        ];
    };

    controls.detectHoveredTile = function (mousePos) {
        var tileSprites = scene.getTiles();

        //if we have previos hovered, then we first check if its still hovered,
        //and avoid looping through all scene
        if (this.lastHovered && this.tileSpriteHitTest(this.lastHovered, mousePos)) {
            //do nothing
        } else {
            for (var i = 0; tileSprites[i]; i++) {
                var tileSprite = tileSprites[i];
                if (this.tileSpriteHitTest(tileSprite, mousePos)) {
                    if (this.lastHovered) this.lastHovered.highlite(false);
                    tileSprite.highlite(true);
                    this.lastHovered = tileSprite;
                }
            }
        }
    }

    controls.tileSpriteHitTest = function (tileSprite, mousePos) {
        var canvas = window.tmpcnv ? window.tmpcnv : window.tmpcnv = document.createElement('canvas');
        var context = window.tmpctx ? window.tmpctx : window.tmpctx = canvas.getContext('2d');

        var sprite = tileSprite;
        var offset = sprite.getOffset();
        var size = sprite.getSize();

        //quick tile sprite bounding box hit test
        if (mousePos[0] < offset[0] ||
            mousePos[1] < offset[1] ||
            mousePos[0] > offset[0] + size[0] ||
            mousePos[1] > offset[1] + size[1]) return false;

        //more accurate tile sprite image hit test, by checking if pixel is alpha.
        canvas.width = size[0];
        canvas.height = size[1];

        var images = sprite.getImages();

        for (var i = 0; images[i]; i++) {
            context.drawImage(images[i], 0, 0);
        }

        if (context.getImageData(mousePos[0] - offset[0], mousePos[1] - offset[1], 1, 1).data[3] > 0) {
            return true;
        }
        ;

        return false;
    }

    return controls;
});