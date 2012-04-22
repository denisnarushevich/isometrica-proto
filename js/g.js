loader.use("sprites.js");
loader.use("controls.js");
loader.use("graphics.js");
loader.use("config.js");
loader.use("simplex.js");

// shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
//simple time testing		
function test(subject,n){
	var t = new Date();
	if(!n)n = 1000000;
	for(var i = 0; i < n; i++){
		subject(i);
	}
	console.log( (new Date())-t );
	console.log( ((new Date())-t)/n );
}

var g = {
	init: function(){
		this.sprites.load(function(){
			if(g.sprites.loaded()){
				g.controls.init();
				g.graphics.init();
				
				g.loop();
			}
		});
	},
	loop: function(){
		g.scene.update();
		g.scene.drawScene();
		
		window.requestAnimFrame(function(){ //at moment of testing this was a bit slower then setInterval, but hope requestAnimation will get optimized in future
			g.loop();
		});
	}
};