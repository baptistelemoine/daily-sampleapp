define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/VideoModalTemplate.html'

    ], function ($, _, Backbone, ModalTemplate) {

    return Backbone.View.extend({
        
        initialize:function(options) {
        
            _.bindAll(this, 'render', 'onBtnClose');
            this.model.on('reset', this.render);
			this.model.on('change', this.render);
        },

        events:{
            'tap div.button':'onBtnClose'
        },

        template:_.template(ModalTemplate),

        render:function(){

            this.$el.html(this.template(this.model.toJSON()))
            .appendTo($('#video-modal').empty());
            return this;
        },

        onBtnClose:function(e){
            $('#video-modal').modal('hide');
        }
    });

});