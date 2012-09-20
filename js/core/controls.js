define(['jquery', './logic', './scene'], function($, logic, scene){
  var controls = {
    mouseAtWhenPressed: [0, 0],
    mapAtWhenPressed: [0, 0],
    sensitivity: 1,
    tileSideLen: null,
    lastHovered: null
  };
  
  controls.init = function(){
    $(window).bind('mousedown', function(event){
      controls.downHandler(event);
    });
  
    $(window).mousemove(function(event){
      controls.detectHoveredTile([event.pageX, event.pageY]);
    });
    
    this.tileSideLen = this.transformMousePosition(64, 0)[0]; //actually I don't know exactly(mathematically) why it works', but if tile image is in right proportions, the its ok.
  };
  
  controls.downHandler = function(event){
    this.mouseAtWhenPressed = this.transformMousePosition(event.pageX, event.pageY)
    this.mapAtWhenPressed = [logic.player.position.getX(), logic.player.position.getY()];
		
    $(window).bind('mousemove.scroll', function(event){
      controls.moveHandler(event);
    });
    
    $(window).bind('mouseup', function(event){
      controls.upHandler(event);
    });
		
    //setting cursor
    $('body').css({
      cursor: 'pointer'
    });
		
    return false; //to avoid text and image selection
  };
    
  controls.upHandler = function(event){
    $(window).unbind('mousemove.scroll');
    $(window).unbind('mouseup');
		
    //UNsetting cursor
    $('body').css({
      cursor: 'initial'
    });
  };
    
  controls.moveHandler = function(event){
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
  controls.transformMousePosition = function(x, y){
    return [
    (x) * Math.cos( Math.PI / -4 ) / 2 - (y) * Math.sin( Math.PI / -4 ),
    - ( (x) * Math.sin( Math.PI / -4 ) / 2 + (y) * Math.cos( Math.PI / -4 ) ),
    ];
  };
    
  controls.detectHoveredTile = function(mousePos){
    var tileSprites = scene.getTiles();
    
    //if we have previos hovered, then we first check if its still hovered,
    //and avoid looping through all scene 
    if(this.lastHovered && this.tileSpriteHitTest(this.lastHovered, mousePos)){
      //do nothing
    }else{
      for(var key in tileSprites){
        var tileSprite = tileSprites[key];
        if ( this.tileSpriteHitTest(tileSprite, mousePos) ) {
          if ( this.lastHovered ) this.lastHovered.highlite(false);
          tileSprite.highlite(true);
          this.lastHovered = tileSprite;
        }
      }
    }
  }
  
  controls.tileSpriteHitTest = function(tileSprite, mousePos){
    var canvas = window.tmpcnv ? window.tmpcnv : window.tmpcnv = document.createElement('canvas');
    var context = window.tmpctx ? window.tmpctx : window.tmpctx = canvas.getContext('2d');
    
    var sprite = tileSprite;
    var offset = sprite.getOriginOffset();
    var size= sprite.getSize();
    
    //quick tile sprite bounding box hit test
    if(mousePos[0] < offset[0] ||
      mousePos[1] < offset[1] ||
      mousePos[0] > offset[0] + size[0] ||
      mousePos[1] > offset[1] + size[1]) return false;
    
    //more accurate tile sprite image hit test, by checking if pixel is alpha.
    canvas.width = size[0];
    canvas.height = size[1];

    var images = sprite.getImages();
      
    for(var i in images){
      context.drawImage(images[i], 0, 0);
    }

    if(context.getImageData(mousePos[0] - offset[0], mousePos[1] - offset[1], 1, 1).data[3] > 0){
      return true;
    };
        
    return false;
  }
    
  return controls;
});