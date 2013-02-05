define([
    'jquery',
    'underscore',
    'backbone',
    'views/renderer/VideoItem'

    ], function ($, _, Backbone, VideoItem) {

    return Backbone.View.extend({
        
        initialize:function(options) {
          
          _.bindAll(this, 'addOne', 'addAll');

          this.collection.on('add', this.addOne);          
          this.collection.on('reset', this.addAll);

        },

        addOne:function(item){
	        var video = new VideoItem({
	        	model:item
	        });
	        this.$el.append(video.render().el);
        },

        addAll:function(){
        	this.collection.each(this.addOne);
        }

    });

});