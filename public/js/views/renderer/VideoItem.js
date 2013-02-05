define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/VideoItemTemplate.html'

    ], function ($, _, Backbone, VideoItemTemplate) {

    return Backbone.View.extend({
        
        initialize:function(options) {
          
          _.bindAll(this, 'render'); 
          this.model.on('change', this.render);
        },

        template:_.template(VideoItemTemplate),

        render:function(){
        	this.$el.html(this.template(this.model.toJSON()));
        	return this;
        }

    });

});