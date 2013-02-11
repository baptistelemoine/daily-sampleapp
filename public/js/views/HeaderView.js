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
            $.ajax({
			url:'https://api.dailymotion.com/channel/'+this.model.get('channel')+'?fields=name',
				dataType:'json',
				success:function (resp){
					self.model.set({'channel_name':resp.name}, {silent:true});
					self.$el.html(self.template(self.model.toJSON()));					
				}
			});

            this.$el.html(this.template(this.model.toJSON()));
            return this;

        }

    });

});