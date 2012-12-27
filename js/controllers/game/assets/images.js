define(function () {
    return {
        urns:[
            /* TILES */
            'terrain/grass/grass.png',
            'terrain/coast/coast.png',
            'terrain/sea/sea.png',
            'terrain/deepsea/deepsea.png',
            'terrain/cursor/cursor.png',
            'terrain/misc/highlite/2101.png',
            'terrain/misc/highlite/2111.png',
            'terrain/misc/highlite/2112.png',
            'terrain/misc/highlite/2121.png',
            'terrain/misc/highlite/2122.png',
            'terrain/misc/highlite/2123.png',
            'terrain/misc/highlite/2211.png',
            'terrain/misc/highlite/2212.png',
            'terrain/misc/highlite/2221.png',
            'terrain/misc/highlite/2222.png',
            'terrain/misc/highlite/2223.png',
            'terrain/misc/highlite/2232.png',
            'terrain/misc/highlite/2233.png',
            'terrain/misc/highlite/2321.png',
            'terrain/misc/highlite/2322.png',
            'terrain/misc/highlite/2323.png',
            'terrain/misc/highlite/2332.png',
            'terrain/misc/highlite/2333.png',
            'terrain/misc/highlite/2343.png',
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
            'terrain/road/1-1.png',
            'terrain/road/1-2.png',
            'terrain/road/3-1.png',
            'terrain/road/3-2.png',
            'terrain/road/3-3.png',
            'terrain/road/3-4.png',
            'terrain/road/2-1.png',
            'terrain/road/2-2.png',
            'terrain/road/2-3.png',
            'terrain/road/2-4.png',
            'terrain/road/4-1.png',
            'terrain/road/5-1.png',
            'terrain/road/5-2.png',
            'terrain/road/5-3.png',
            'terrain/road/5-4.png',

            /* BUILDINGS */
            'objects/Tree1/Tree1.png',
            'objects/Tree2/Tree2.png',
            'objects/building/house1.png',

            /* VEHICLES */
            'objects/vehicles/car1.png',
        ],

        dirUrl:'images/',
        hash:{},
        loadCount:0,

        /**
         * preloads all image for browser to cache them in his internal cache
         */
        load:function (onEachLoad) {
            var images = this;
            var name = this.urns[this.loadCount];
            var image = new Image();
            this.hash[name.split('.')[0]] = image;
            image.onload = function () {
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
        loaded:function () {
            return this.loadProgress() == 1;
        },

        loadProgress:function () {
            return this.loadCount / this.urns.length;
        },

        currentLoadingName:function () {
            return this.loaded() ? 'done' : this.urns[this.loadCount];
        },

        getImage:function (urn) {
            //console.log(arguments.callee.caller.toString());
            var image;
            if (image = this.hash[urn])
                return image;
            else throw 'Error: There is no such image "' + urn;
        }
    }
});