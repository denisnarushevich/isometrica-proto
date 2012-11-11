define(function () {

    function Tile(tiles, gridPoints) {
        this.gridPoints = gridPoints;
        this.position = gridPoints[0];
        this.tiles = tiles;
    };

    Tile.prototype = {
        id:null,
        type: 'Tile',
        baseType: 'Tile',
        tiles:null,
        gridPoints:null,
        slopeId:null,
        spriteType:null,
        terrain:null,
        position:null,
        isPointedStatus: false,

        update:function () {

            return this;
        },

        getGridPoints:function () {
            return this.gridPoints;
        },

        getSlopeId:function () {
            if (this.slopeId) return this.slopeId;

            var gridPoints = this.getGridPoints();
            return this.slopeId = 2000 + (gridPoints[1].getZ() - gridPoints[0].getZ() + 2) * 100 + (gridPoints[2].getZ() - gridPoints[0].getZ() + 2) * 10 + (gridPoints[3].getZ() - gridPoints[0].getZ() + 2);
        },

        getTerrain:function () {
            return this.terrain;
        },

        getType:function () {
            return this.type;
        },

        getBaseType: function(){
          return this.baseType;
        },

        getSpriteType: function(){
          return this.spriteType;
        },

        getPosition:function () {
            return this.position;
        },

        setId:function (id) {
            this.id = id;
            return this;
        },

        setPosition:function (vector3) {
            this.position = vector3;
        }
    };

    Tile.prototype.isPointed = function(bool){
            return  (bool == undefined ? this.isPointedStatus : this.isPointedStatus = bool);
    }

    return Tile;
});