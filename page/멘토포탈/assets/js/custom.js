document.addEventListener('DOMContentLoaded', function() {
	var choicesList = document.querySelectorAll('[data-choices]');
	for (i = 0; i < choicesList.length; ++i) {
		var element = choicesList[i];
		new Choices(element, {
			allowHTML: true,
			searchEnabled: false,
		});
	}
	// Scroll Back Top Button
	var toTop = document.getElementById("backToTop");
	toTop.addEventListener("click", backToTop);
	function backToTop() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}
});

jQuery(function($){

	$(".form-datepicker").on('click', function(){
		$(".datepicker-box").fadeOut(150);
        if($(this).parents('.datepicker-wrap').hasClass('show')){
			return false;
		}else{
			$(this).parents('.datepicker-wrap').addClass('show');
			$(this).siblings('.datepicker-box').fadeIn(150);
			return false;
		}
	});
	$(".datepicker-wrap").on('click', function(){
        if($(this).hasClass('show')){
			$(this).removeClass('show');
			$(this).find('.datepicker-box').fadeOut(150);
		}else{
			return false;
		}
	});

	$(".modal-side-toggle").on('click', function(){
        if($(this).parents('.modal-body').hasClass('expanded')){
			$(this).parents('.modal-body').removeClass('expanded');
			return false;
		}else{
			$(this).parents('.modal-body').addClass('expanded');
			return false;
		}
	});

	fluidAutoHeight();
	$(window).resize(fluidAutoHeight);
	function fluidAutoHeight(){

		var $fluid_height = $(window).outerHeight();
		var $fluid_inner = 0;

		if($('.fluid-card').length > 0){

			if($('.fluid-card .card-head').length > 0) $fluid_inner = $fluid_inner + $('.fluid-card .card-head').outerHeight();
			if($('.fluid-card .card-body').length > 0) $fluid_inner = $fluid_inner + $('.fluid-card .card-body').outerHeight();
			if($('.fluid-card .card-foot').length > 0) $fluid_inner = $fluid_inner + $('.fluid-card .card-foot').outerHeight();


			if($('.page-header').length > 0) $fluid_height = $fluid_height - $('.page-header').outerHeight();
			if($('.page-footer').length > 0) $fluid_height = $fluid_height - $('.page-footer').outerHeight();
			if($('.page-content-title').length > 0) $fluid_height = $fluid_height - $('.page-content-title').outerHeight();			
			if($('.card-l1').length > 0) $fluid_height = $fluid_height - $('.card-l1').outerHeight() - 24;
			if($('.page-content').length > 0) $fluid_height = $fluid_height - 36;

		
			$('.fluid-card').height($fluid_height - 2);
			$('.fluid-card').css('min-height', $fluid_inner);
		}

		if($('.card-l1').length > 0){
			$('.main-content').addClass("onPageSchedule");
		}
		if($('.page-footer').length > 0){
			$('.main-content').addClass("onPageFooter");
		}
	}

});
