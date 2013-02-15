define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/VideoItemTemplate.html',
    'text!templates/PopoverTemplate.html',
    'models/user'

    ], function ($, _, Backbone, VideoItemTemplate, PopoverTemplate, UserModel) {

    return Backbone.View.extend({
        
        initialize:function(options) {
          
          _.bindAll(this, 'render', 'onTitleTap', 'onUserTap', 'navigate');
          this.model.on('change', this.render);
        },

        events:{
            'tap div[data-role="tooltip"]'         :'onTitleTap',
            'tap img'                              :'navigate',
            'tap div[data-role="popover"]'         :'onUserTap',
            'tap div[data-role="popover-btn-user"]':'navigate'
        },

        template:_.template(VideoItemTemplate),

        render:function(){
            
            var ellipse = this.cut(this.model.get('title'), 45);
            this.model.set({'short_title':ellipse}, {silent:true});
            this.$el.html(this.template(this.model.toJSON()));
            
            //populate popover
            var tmpl = _.template(PopoverTemplate);
            $('div[data-role="popover"]', this.$el).attr('data-content', tmpl(this.model.get('user').toJSON()));

            return this;
        },

        onTitleTap:function(e){
           var $current = $(e.currentTarget);
           $('div[data-role="tooltip"]').not($current).tooltip('hide');
           $current.next().hasClass('in') ? $current.tooltip('hide') : $current.tooltip('show');
        },

        onUserTap:function(e){
            var $current = $(e.currentTarget);
            console.log($(e.currentTarget).parents('.row-fluid .page').find('.item-container'));
            $('div[data-role="popover"]').not($current).popover('hide');
            $current.next().hasClass('in') ? $current.popover('hide') : $current.popover('show');
        },

        navigate:function(e){
            var router = new Backbone.Router();
            router.navigate($(e.currentTarget).data('rel'), {trigger:true});
        },

        cut:function(str, lng){
            return str.length > lng ? str.substring(0,lng) + ' [...]' : str;
        }

    });

});