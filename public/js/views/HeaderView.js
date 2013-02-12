define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/HeaderTemplate.html'
    
    ], function ($, _, Backbone, HeaderTemplate) {

    return Backbone.View.extend({
        
        initialize:function(options) {
            
            _.bindAll(this, 'render');
            this.model.on('reset', this.render);
            this.model.on('change', this.render);
        },

        template:_.template(HeaderTemplate),

        render:function(){

            var self = this;
            if(self.model.get('isChannel')){

                $.ajax({
                url:'https://api.dailymotion.com/channel/'+this.model.get('channel')+'?fields=name',
                    dataType:'json',
                    success:function (resp){
                        self.model.set({'channel_name':resp.name}, {silent:true});
                        self.$el.html(self.template(self.model.toJSON()));
                    }
                });
            }
            else this.model.set({'channel_name':this.model.get('channel')});

            this.$el.html(this.template(this.model.toJSON()));
            return this;

        }

    });

});