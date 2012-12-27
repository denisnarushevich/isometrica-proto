define(['../config'], function (config) {

        function Scene(rootNode){
            this.rootNode = rootNode;
        }

        var p = Scene.prototype;

        p.rootNode = null;

        return Scene;
    }
)
;