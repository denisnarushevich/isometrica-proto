define(function () {
    //functional vector api
    var Vec = {};

    Vec.create = function (x, y, z) {
        return {
            x: x,
            y: y,
            z: z
        }
    }

    Vec.add = function (a, b) {
        a.x += b.x;
        a.y += b.y;
        a.z += b.z;
    }

    Vec.sub = function (a, b) {
        a.x -= b.x;
        a.y -= b.y;
        a.z -= b.z;
    }

    Vec.mul = function(a, b){
        a.x *= b.x;
        a.y *= b.y;
        a.z *= b.z;
    }

    Vec.div = function(a, b){
        a.x /= b.x;
        a.y /= b.y;
        a.z /= b.z;
    }

    Vec.norm = function (a) {
        a.x = a.x > 0 ? a.x / Math.abs(a.x) : 0;
        a.y = a.y > 0 ? a.y / Math.abs(a.y) : 0;
        a.z = a.z > 0 ? a.z / Math.abs(a.z) : 0;
    }

    return Vec;
})
;