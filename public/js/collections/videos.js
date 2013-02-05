define([
    'jquery',
    'underscore',
    'backbone',
    'paginator'

], function ($, _, Backbone, Paginator){

    return Backbone.Paginator.requestPager.extend({
        

        initialize:function(param){
            this.urlParam = param;
        },
        
        paginator_core: {
            type: 'GET',
            dataType: 'json',
            url:function() { return 'https://api.dailymotion.com/channel/'+this.urlParam.channel+'/videos';}
        },
        
        paginator_ui: {
            firstPage: 0,
            currentPage: 1,
            perPage: 6,
            totalRecords:0,
            totalPages: 0,
            genericFields:['title','thumbnail_large_url','views_total'],
            fields:function() {
                if(this.urlParam.fields)
                    return this.genericFields.concat(this.urlParam.fields).join(',');
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