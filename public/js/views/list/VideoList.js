define([
    'jquery',
    'underscore',
    'backbone',
    'views/renderer/VideoItem',
    'text!templates/VideoListTemplate.html',
    'models/user'

    ], function ($, _, Backbone, VideoItem, VideoListTmpl, UserModel) {

    return Backbone.View.extend({
        
        initialize:function(options) {
          
          _.bindAll(this, 'addOne', 'addAll');

          this.collection.on('add', this.addOne);
          this.collection.on('reset', this.addAll);
          this.collection.on('change', this.addAll);

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
            
            var self = this;
            // empty dom video list
            this.$el.empty();
            
            //for each item in collection, retrieve user info before rendering
            _.each(this.collection.models, function (value) {
                var user = new UserModel();
                user.url = 'https://api.dailymotion.com/user/'+value.get('owner')+'?fields=videos_total,screenname,avatar_medium_url,id';
                user.fetch({
                    success:function(data){
                        value.set({'user':data}, {silent:true});
                        self.addOne(value);
                    }
                });
            });
        }

    });

});