define(function () {
    //functional vector api
    var Vec = {};

    Vec.create = function (x, y) {
        return {
            x: x,
            y: y
        }
    }

    Vec.add = function (a, b) {
        a.x += b.x;
        a.y += b.y;
    }

    Vec.sub = function (a, b) {
        a.x -= b.x;
        a.y -= b.y;
    }

    Vec.mul = function(a, b){
        a.x *= b.x;
        a.y *= b.y;
    }

    Vec.div = function(a, b){
        a.x /= b.x;
        a.y /= b.y;
    }

    Vec.norm = function (a) {
        a.x = a.x > 0 ? a.x / Math.abs(a.x) : 0;
        a.y = a.y > 0 ? a.y / Math.abs(a.y) : 0;
    }

    return Vec;
})
;