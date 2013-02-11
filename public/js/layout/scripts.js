jQuery(document).ready(function($) {

	/* FILTERS DROP DOWN MENU */
	function DropDown(el) {
			this.dd = el;
			this.opts = this.dd.find('ul.option-set > li');
			this.placeholder = this.dd.children('span');
			this.val = [];
			this.index = [];
			this.initEvents();
	}

	DropDown.prototype = {
		initEvents : function() {
			var obj = this;

			obj.dd.hammer({
					prevent_default: false
				}).on('tap', function(event){
					$(this).toggleClass('active');
					event.stopPropagation();
			});

			obj.opts.hammer({
					prevent_default: false
				}).on('tap', function(event){
					var opt = $(this);
					obj.val = opt.text();
					obj.index = opt.index();
					//obj.placeholder.text('' + obj.val);
					obj.opts.removeClass('selected');
					opt.addClass('selected');
					obj.dd.removeClass('active');
			});
		}
	};

	var dd = new DropDown( $('#filters') );
	//update current channel, for the first load
	var hash = document.location.hash.split('/')[1];
	var items = $('#filters').find('ul.option-set > li');
		$('a', items).each(function (value){
		if($(this).data('option-value') === hash)
			$(this).parent().addClass('selected');
	});

	/* EMPTY MODAL WHEN HIDDEN */
	$('#video-modal').on('hide', function (e){
		$(this).empty();
	});
	
	//manage tap events for all video items, waiting for item rendering
	$(document).on('itemComplete', function (e, tooltip, needTooltip){
		tooltip.on('click', function (e) {
			e.preventDefault();
		});
		if(needTooltip){
			tooltip.hammer().on('tap', function (e){
				$('a[data-role="tooltip"]').not($(this)).tooltip('hide');
				$(this).next().hasClass('in') ? $(this).tooltip('hide') : $(this).tooltip('show');
			});
		}
	});

	//menu tab bar
	$('#menu-bar i').hammer().on('tap', function (e){
		
		var index = $('#menu-bar i').index($(this));
		Tab.init(index);
		$('div.menu-content').hide();
		$('div.menu-content').eq(index).show();
		
	});	
	
	var Tab = {
		
		$tabContainer:$('#menu-bar'),
		$icons:$('#menu-bar i'),
		isOpen:false,
		index:0,
		init:function(index){
			this.index = index;
			this.openClose();
		},
		openClose:function(){
			//if no one icon is active or this one is...
			if(this.$icons.eq(this.index).hasClass('active-icon') || !this.$icons.hasClass('active-icon')){
				this.isOpen ? this.$tabContainer.css('left','-360px') : this.$tabContainer.css('left',0);
				this.isOpen =! this.isOpen;
			}
			this.layout();
			
		},
		layout:function(){
			var self = this;
			this.$icons.each(function (i){
				self.$icons.eq(i).removeClass();
				switch(i){
					case 0:self.$icons.eq(i).addClass('icon-search');
						break;
					case 1:self.$icons.eq(i).addClass('icon-user');
						break;
					case 2:self.$icons.eq(i).addClass('icon-info');
						break;
					case 3:self.$icons.eq(i).addClass('icon-twitter');
						break;
				}
			});
			if(this.isOpen) self.$icons.eq(self.index).removeClass().addClass('icon-cancel active-icon');
		}
	}

});