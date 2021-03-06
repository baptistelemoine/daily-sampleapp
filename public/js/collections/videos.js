define([
    'jquery',
    'underscore',
    'backbone',
    'paginator',
    'models/video'

], function ($, _, Backbone, Paginator, video){

    return Backbone.Paginator.requestPager.extend({
        
        model:video,

        initialize:function(param){
            this.param = param;
        },
        
        paginator_core: {
            type: 'GET',
            dataType: 'json',
            cache:true,
            url:function(){return this.param.url || _.first(this.param).get('url');}
        },
        
        paginator_ui: {
            firstPage: 0,
            currentPage: 1,
            perPage: 8,
            totalRecords:0,
            totalPages: 0,
            genericFields:['title','thumbnail_large_url','views_total', 'owner', 'id'],
            fields:function() {
                if(this.param.fields)
                    return this.genericFields.concat(this.param.fields).join(',');
                else return this.genericFields.join(',');
            }
        },
        
        server_api: {
            'fields': function() {return this.fields();},
            'page':function() {return this.currentPage;},
            'limit':function() {return this.perPage;}
        },

        parse:function(response){
            this.totalRecords = response.total;
            this.totalPages = Math.floor(this.totalRecords / this.perPage);
            return response.list;
        }

    });

});