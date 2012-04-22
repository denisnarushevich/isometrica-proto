g.objects = {
	getObject: function(name){
		return {
			name: name,
			sprite: g.sprites.getSprite('objects/tree/'+name)
		}
	}
}