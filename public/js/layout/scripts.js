jQuery(document).ready(function($) {

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

			obj.dd.on('click', function(event){
				$(this).toggleClass('active');
				event.stopPropagation();
			});
			obj.opts.on('click',function(){
				var opt = $(this);
				obj.val = opt.text();
				obj.index = opt.index();
				obj.placeholder.text('' + obj.val);
			});
		}
	};

	$(function() {

		var dd = new DropDown( $('#filters') );

		$(document).click(function() {
			$('.filters-dropdown').removeClass('active');
		});

		$(".option-set").click(function() {
			$('.filters-dropdown').toggleClass('active');
		});

	});

});