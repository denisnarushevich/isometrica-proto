define(['text!templates/loader/loadScreen.html'], function (template) {
    var View = Backbone.View.extend({
        initialize:function () {
            this.template = $(template);
        },
        render:function () {
            $(this.el).empty();
            $(this.el).append(this.template);
        },
        setProgress: function(progress){
            $('.bar', this.template)[0].style.width = (progress * 100) + '%';
        },
        setText: function(text){
            $('.text', this.template).text(text);
        }
    });

    return View;
})
;