var loader = {
	used: {},
	libDir: 'js/',
	use: function(scriptName, callback){
		if (scriptName in this.used) return;
		else this.used[scriptName] = true;
		
		var script = document.head.appendChild(document.createElement('script'));
			script.type = 'text/javascript';
			script.onload = callback ? callback : function(){};
			script.src = this.libDir + scriptName;
	}
}