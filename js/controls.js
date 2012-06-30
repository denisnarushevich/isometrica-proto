define(['jquery'], function(){

  return g.controls ? g.controls : g.controls = {
    mouseAtWhenPressed: [0, 0],
    mapAtWhenPressed: [0, 0],
    sensitivity: 1,
    tileSideLen: null,
    init: function(){
      $(window).bind('mousedown', g.controls.downHandler);
      this.tileSideLen = this.transformMousePosition(64, 0)[0]; //actually I don't know exactly(mathematically) why it works', but if tile image is in right proportions, the its ok.
    },
    downHandler: function(event){
      g.controls.mouseAtWhenPressed = g.controls.transformMousePosition(event.pageX, event.pageY)
      g.controls.mapAtWhenPressed = g.graphics.scene.at;
		
      $(window).bind('mousemove', g.controls.moveHandler);
      $(window).bind('mouseup', g.controls.upHandler);
		
      //setting cursor
      $('body').css({
        cursor: 'pointer'
      });
		
      return false; //to avoid text and image selection
    },
    upHandler: function(event){
      $(window).unbind('mousemove', g.controls.moveHandler);
      $(window).unbind('mouseup', g.controls.upHandler);
		
      //UNsetting cursor
      $('body').css({
        cursor: 'initial'
      });
    },
    moveHandler: function(event){
      var controls = g.controls;
		
      //current position of mouse pointer on screen in screen pixel coordinates
      var currentAt = controls.transformMousePosition(event.pageX, event.pageY);
		
      //distance from click point, in screen pixel coordinates
      var scrolledFor = [
      ( currentAt[0] - controls.mouseAtWhenPressed[0] ) / controls.tileSideLen * controls.sensitivity,
      ( currentAt[1] - controls.mouseAtWhenPressed[1] ) / controls.tileSideLen * controls.sensitivity
      ];
      
      g.graphics.scene.setAt([
        controls.mapAtWhenPressed[0] - scrolledFor[0],
        controls.mapAtWhenPressed[1] - scrolledFor[1]
        ]);
    },
    /**
	 * it takes mouse coordinates and rotates them by -45 degree, then dividing x coordinate by 2.
	 * this way we get mouse position in "isometric" coordinates.
	 */
    transformMousePosition: function(x, y){
      return [
      (x) * Math.cos( Math.PI / -4 ) / 2 - (y) * Math.sin( Math.PI / -4 ),
      - ( (x) * Math.sin( Math.PI / -4 ) / 2 + (y) * Math.cos( Math.PI / -4 ) ),
      ];
    }
  }
});