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
            
            var ellipse = this.cut(this.model.get('title'), 45);
            this.model.set({'short_title':ellipse}, {silent:true});

            var self = this;
            $.ajax({
                url:'https://api.dailymotion.com/user/'+this.model.get('owner'),
                dataType:'json',
                success:function (resp){
                    self.model.set({'owner_name':self.cut(resp.screenname, 25)}, {silent:true});
                    self.$el.html(self.template(self.model.toJSON()));
                    var tooltip = false;
                    if(self.model.get('short_title') !== self.model.get('title')) tooltip = true;
                    $(document).trigger('itemComplete', [
                        $('a[data-role="tooltip"]', self.$el), 
                        tooltip
                        ]);
                }
            });

            this.$el.html(this.template(this.model.toJSON()));            
            return this;
        },

        cut:function(str, lng){
            return str.length > lng ? str.substring(0,lng) + ' [...]' : str;
        }

    });

});