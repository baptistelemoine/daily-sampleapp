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

			this.initCommon();

			this.appRouter = new AppRouter();
			this.appRouter.on('route:getVideo', this.getVideo);
			this.appRouter.on('route:getChannel', this.getChannel);
			this.appRouter.on('route:getSearch', this.getSearch);
			this.appRouter.on('route:getUser', this.getUser);
			this.appRouter.on('route:default', this.defaultPath);
			Backbone.history.start({pushState:false});

		},

		initCommon:function(){
			var self = this;
			//populate twitter feed
			var t = new Tweets();
			t.fetch({data:{screen_name:'dailymotion', count:5, include_entities:1}});
			var widget = new TwitterWidget({
				collection:t
			});
			
			//init header view, insert it before filter ddl
			this.headerModel = new ChannelModel({
				channel:'', page:0, total_pages:0, isChannel:false
			});
			this.header = new HeaderView({
				model:self.headerModel
			});
			$('div[data-role="list-filter"]').before(this.header.render().$el);
		},

		defaultPath:function(){
			this.appRouter.navigate('channel/videogames', {trigger:true});
		},

		getUser:function(id){
			
			this.headerModel.set({
				channel:'',	page:0,	total_pages:'counting...', isChannel:false
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
			this.headerModel.set({
				channel:'Search : '+keyword,
				page:0,
				total_pages:'counting...',
				isChannel:false
			});

			var url = 'https://api.dailymotion.com/videos?search='+keyword;
			this.initSwipe(url);
		},

		getChannel:function(hash){

			//append header list
			this.headerModel.set({
				channel:hash, page:0, total_pages:'counting...', isChannel:true
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

			//empty previous slide, add preloader
			$('#slider-container').empty().append('<div class="loading"></div>');

			//fetch current url, get response total videos/pages
			//before launching the swie view
			var coll = new Videos({url:url});
			coll.fetch({
				success:function(data){
					//update paging header
					var totalPages = data.info().totalPages <= 100 ? data.info().totalPages : 100;
					var currentPage = data.info().totalRecords > 0 ? 1 : 0;
					//update total pages in header info
					self.headerModel.set({ total_pages:totalPages});
					//if user search, no model current page update
					if(!isNaN(data.info().totalPages))
						self.headerModel.set({total_pages:totalPages,page:currentPage});
					
					//launch swipe view
					self.swipeView = new SwipeView({
						numPages:totalPages,
						collection:new Videos({url:url})
					});
					self.swipeView.$el.on('pageFlip', function (e){
						self.headerModel.set('page', self.swipeView.currentPage);
					});
				}
			});

			this.historyPrev = Backbone.history.fragment;

			$('#filters').removeClass('active');
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