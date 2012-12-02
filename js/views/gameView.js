define(['text!templates/game/fullscreen.html'], function(template){
    var View = Backbone.View.extend({
        initialize: function(){
           this.template = $(template);
        },
        render:function () {
            $(this.el).empty();
            $(this.el).append(this.template);
        }
    });
    return View;
});