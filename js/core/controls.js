define(['jquery', './logic'], function($, logic){
  var controls = {
    mouseAtWhenPressed: [0, 0],
    mapAtWhenPressed: [0, 0],
    sensitivity: 1,
    tileSideLen: null
  };
  
  controls.init = function(){
    $(window).bind('mousedown', function(event){
      controls.downHandler(event);
    });
    
    this.tileSideLen = this.transformMousePosition(64, 0)[0]; //actually I don't know exactly(mathematically) why it works', but if tile image is in right proportions, the its ok.
  };
  
  controls.downHandler = function(event){
    this.mouseAtWhenPressed = this.transformMousePosition(event.pageX, event.pageY)
    this.mapAtWhenPressed = [logic.player.position.getX(), logic.player.position.getY()];
		
    $(window).bind('mousemove', function(event){
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
    $(window).unbind('mousemove');
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
    
  return controls;
});