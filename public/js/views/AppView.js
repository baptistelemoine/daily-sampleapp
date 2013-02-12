define([
  'jquery',
  'underscore',
  'backbone',
  'collections/videos',
  'views/list/VideoList',
  'router',
  'views/ModalView',
  'models/video',
  'views/HeaderView',
  'models/channel',
  'views/SwipeView',
  'collections/tweets',
  'views/list/TwitterWidget'

], function ($, _, Backbone, Videos, VideoList, AppRouter, ModalView, VideoModel, HeaderView, ChannelModel, SwipeView, Tweets, TwitterWidget){
	
	return Backbone.View.extend({

		initialize:function(){
			
			_.bindAll(this, 'defaultPath', 'getChannel', 'getVideo', 'getSearch', 'getUser');

			this.appRouter = new AppRouter();
			this.appRouter.on('route:getVideo', this.getVideo);
			this.appRouter.on('route:getChannel', this.getChannel);
			this.appRouter.on('route:getSearch', this.getSearch);
			this.appRouter.on('route:getUser', this.getUser);
			this.appRouter.on('route:default', this.defaultPath);
			Backbone.history.start({pushState:false});

			//populate twitter feed
			var t = new Tweets();
			t.fetch({data:{screen_name:'dailymotion', count:5, include_entities:1}});
			var widget = new TwitterWidget({
				collection:t
			});
			

		},

		defaultPath:function(){
			this.appRouter.navigate('channel/videogames', {trigger:true});
		},

		getUser:function(id){
			
			this.headerModel = new ChannelModel({
				channel:'',
				page:1,
				total_pages:0,
				isChannel:false
			});

			var self = this;
			$.ajax({
                url:'https://api.dailymotion.com/user/'+id+'?fields=videos_total,screenname',
                    dataType:'json',
                    success:function (resp){
						//append header list
						self.headerModel.set({
							channel:'User : '+resp.screenname,
							page:1,
							total_pages:Math.round(resp.videos_total/8) >100 ? 100 : Math.round(resp.videos_total/8),
							isChannel:false
						});
                    }
            });
            var url = 'https://api.dailymotion.com/user/'+id+'/videos';
            this.initSwipe(url);
			
		},

		getSearch:function(keyword){
			//append header list
			this.headerModel = new ChannelModel({
				channel:'Search : '+keyword,
				page:1,
				total_pages:100,
				isChannel:false
			});

			var url = 'https://api.dailymotion.com/videos?search='+keyword;
			this.initSwipe(url);
		},

		getChannel:function(hash){

			//append header list
			this.headerModel = new ChannelModel({
				channel:hash,
				page:1,
				total_pages:100,
				isChannel:true
			});

			//construct url and launch swipe view
			var url = 'https://api.dailymotion.com/channel/'+hash+'/videos';
			this.initSwipe(url);
			
		},

		initSwipe:function (url){
			
			var self = this;
			//garbage collector
			if(this.swipeView) {
				this.swipeView.destroy();
			}

			if(this.header) this.header.$el.remove();
			this.header = new HeaderView({
				model:self.headerModel
			});

			$('div[data-role="list-filter"]').before(this.header.render().$el);
			$('#filters').removeClass('active');

			this.swipeView = new SwipeView({
				numPages:100,
				collection:new Videos({url:url})
			});
			this.swipeView.$el.on('pageFlip', function (e){
				self.headerModel.set('page', self.swipeView.currentPage);
			});

			this.historyPrev = Backbone.history.fragment;
		},
		
		getVideo:function(hash){
			
			//request api and push infos about single video
			var url = 'https://api.dailymotion.com/video/'+hash+'?fields=title,embed_url,description';
			var video = new VideoModel();
			video.url = url;
			
			//create the view
			var modalView = new ModalView({
				model:video
			});

			//fetch the model
			modalView.model.fetch();

			var self = this;
			//launch bootstrap modal
			$('#video-modal').modal();
			$('#video-modal').on('hide', function (e){
				self.appRouter.navigate(self.historyPrev, {trigger:false, replace:true});
			});
		}
		
	});

});