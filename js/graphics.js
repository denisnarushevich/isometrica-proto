loader.use("scene.js");
loader.use("render.js");

g.graphics = {
	init: function(){
		this.setResolution(window.innerWidth, window.innerHeight);
		
		//on window resize, we update size of canvases
		window.onresize = function(){
			g.graphics.setResolution(window.innerWidth, window.innerHeight);
		}
	},
	setResolution: function(width, height){
		g.render.init(width, height);
		g.scene.init(width, height);
	}
}