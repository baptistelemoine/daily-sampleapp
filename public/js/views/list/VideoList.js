define([
    'jquery',
    'underscore',
    'backbone',
    'views/renderer/VideoItem',
    'text!templates/VideoListTemplate.html'

    ], function ($, _, Backbone, VideoItem, VideoListTmpl) {

    return Backbone.View.extend({
        
        initialize:function(options) {
          
          _.bindAll(this, 'addOne', 'addAll');

          this.collection.on('add', this.addOne);
          this.collection.on('reset', this.addAll);

        },

        template:_.template(VideoListTmpl),

        addOne:function(item){
            var video = new VideoItem({
                  model:item
            });
            //create row if > 3
            this.$el.append(this.template());
            //add item on the last row
            $('.row-fluid:last-child',this.$el).append(video.render().el);
        },

        addAll:function(){
            this.collection.each(this.addOne);
        }

    });

});