define(function(){
  return {
    urns: [
    'terrain/grass/2101.png',
    'terrain/grass/2111.png',
    'terrain/grass/2112.png',
    'terrain/grass/2121.png',
    'terrain/grass/2122.png',
    'terrain/grass/2123.png',
    'terrain/grass/2211.png',
    'terrain/grass/2212.png',
    'terrain/grass/2221.png',
    'terrain/grass/2222.png',
    'terrain/grass/2223.png',
    'terrain/grass/2232.png',
    'terrain/grass/2233.png',
    'terrain/grass/2321.png',
    'terrain/grass/2322.png',
    'terrain/grass/2323.png',
    'terrain/grass/2332.png',
    'terrain/grass/2333.png',
    'terrain/grass/2343.png',
    'terrain/oldgrass/2101.png',
    'terrain/oldgrass/2111.png',
    'terrain/oldgrass/2112.png',
    'terrain/oldgrass/2121.png',
    'terrain/oldgrass/2122.png',
    'terrain/oldgrass/2123.png',
    'terrain/oldgrass/2211.png',
    'terrain/oldgrass/2212.png',
    'terrain/oldgrass/2221.png',
    'terrain/oldgrass/2222.png',
    'terrain/oldgrass/2223.png',
    'terrain/oldgrass/2232.png',
    'terrain/oldgrass/2233.png',
    'terrain/oldgrass/2321.png',
    'terrain/oldgrass/2322.png',
    'terrain/oldgrass/2323.png',
    'terrain/oldgrass/2332.png',
    'terrain/oldgrass/2333.png',
    'terrain/oldgrass/2343.png',
    'terrain/snow/2101.png',
    'terrain/snow/2111.png',
    'terrain/snow/2112.png',
    'terrain/snow/2121.png',
    'terrain/snow/2122.png',
    'terrain/snow/2123.png',
    'terrain/snow/2211.png',
    'terrain/snow/2212.png',
    'terrain/snow/2221.png',
    'terrain/snow/2222.png',
    'terrain/snow/2223.png',
    'terrain/snow/2232.png',
    'terrain/snow/2233.png',
    'terrain/snow/2321.png',
    'terrain/snow/2322.png',
    'terrain/snow/2323.png',
    'terrain/snow/2332.png',
    'terrain/snow/2333.png',
    'terrain/snow/2343.png',		
    'terrain/water/2222.png',
    'terrain/deepwater/2222.png',
    'terrain/sand/2101.png',
    'terrain/sand/2111.png',
    'terrain/sand/2112.png',
    'terrain/sand/2121.png',
    'terrain/sand/2122.png',
    'terrain/sand/2123.png',
    'terrain/sand/2211.png',
    'terrain/sand/2212.png',
    'terrain/sand/2221.png',
    'terrain/sand/2222.png',
    'terrain/sand/2223.png',
    'terrain/sand/2232.png',
    'terrain/sand/2233.png',
    'terrain/sand/2321.png',
    'terrain/sand/2322.png',
    'terrain/sand/2323.png',
    'terrain/sand/2332.png',
    'terrain/sand/2333.png',
    'terrain/sand/2343.png',
    'terrain/shore/2101.png',
    'terrain/shore/2111.png',
    'terrain/shore/2112.png',
    'terrain/shore/2121.png',
    'terrain/shore/2122.png',
    'terrain/shore/2123.png',
    'terrain/shore/2211.png',
    'terrain/shore/2212.png',
    'terrain/shore/2221.png',
    'terrain/shore/2222.png',
    'terrain/shore/2223.png',
    'terrain/shore/2232.png',
    'terrain/shore/2233.png',
    'terrain/shore/2321.png',
    'terrain/shore/2322.png',
    'terrain/shore/2323.png',
    'terrain/shore/2332.png',
    'terrain/shore/2333.png',
    'terrain/shore/2343.png',
    'terrain/road/straight1.png',
    'terrain/road/straight2.png',
    'terrain/road/t1.png',
    'terrain/road/t2.png',
    'terrain/road/t3.png',
    'terrain/road/t4.png',
    'terrain/road/turn1.png',
    'terrain/road/turn2.png',
    'terrain/road/turn3.png',
    'terrain/road/turn4.png',
    'terrain/road/x1.png',
    'terrain/road/elevation1.png',
    'terrain/road/elevation2.png',
    'terrain/road/elevation3.png',
    'terrain/road/elevation4.png',
    'objects/tree/tree1.png',
    'objects/tree/tree2.png',
    'objects/tree/tree3.png',
    'objects/tree/tree4.png',
    'objects/tree/tree5.png',
    'objects/tree/tree6.png',
    'objects/tree/tree7.png',
    'objects/vehicle/car1.png'
    ],
    dirUrl: 'images/',
    hash: {},
    loadCount: 0,
    /**
	 * preloads all image for browser to cache them in his internal cache
	 */
    load: function(onEachLoad){
      var images = this;
      var name = this.urns[this.loadCount];
      var image = new Image();
      this.hash[name.split('.')[0]] = image;
      image.onload = function(){
        images.loadCount++;				
        if (onEachLoad) onEachLoad();
        if (!images.loaded()) images.load(onEachLoad);
      };
      image.src = this.dirUrl + name; //add path to textures dir
      return;
    },
    /**
	 *
	 * @return boolean
	 */
    loaded: function(){
      if(this.loadCount == this.urns.length){
        return true;
      }
      return false;
    },
    loadProgress: function(){
      return this.loadCount / this.urns.length;
    },
    getImage: function(urn){
      //console.log(arguments.callee.caller.toString());
      if (this.hash[urn])
        return this.hash[urn];
      else throw 'Error: There is no such image "'+urn;
    }
  }
});