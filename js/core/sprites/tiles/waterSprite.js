define(['./tileSprite'], function(Parent){
    var Sprite = function(model){
        Parent.call(this, model);
    };

    Sprite.prototype = Object.create(Parent.prototype);
    Sprite.prototype.name = 'water';

    return Sprite;
});