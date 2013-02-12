define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/TwitterWidget.html'

    ], function ($, _, Backbone, WidgetTemplate) {

    return Backbone.View.extend({
        
        initialize:function(options) {
          _.bindAll(this, 'render');
          this.collection.on('reset', this.render);
          this.collection.on('change', this.render);
        },

        template:_.template(WidgetTemplate),

        render:function(){

			var self = this;

			_.each(this.collection.models, function (value, index){
				_.each(value.get('entities').urls, function (val, i){
					var nt = value.get('text').replace(val.url, '<a href='+val.url+'>'+val.url+'</a>');
					value.set('html_text',nt);
				});
				self.$el.append(self.template(value.toJSON())).appendTo($('#twitter-feed'));
			});

			/*_.each(this.collection.models, function (value, index){
				
			});		*/

        }

    });

});