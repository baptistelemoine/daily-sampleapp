define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/VideoModalTemplate.html'

    ], function ($, _, Backbone, ModalTemplate) {

    return Backbone.View.extend({
        
        initialize:function(options) {
        
            _.bindAll(this, 'render');
            this.model.on('reset', this.render);
			this.model.on('change', this.render);
        },

        template:_.template(ModalTemplate),

        render:function(){

            this.$el.html(this.template(this.model.toJSON()))
            .appendTo($('#video-modal').empty());
            return this;
        }
    });

});