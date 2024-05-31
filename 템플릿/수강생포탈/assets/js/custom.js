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
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

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

	fluidAutoHeight();
	$(window).resize(fluidAutoHeight);
	function fluidAutoHeight(){
		var $fluid_height = $(window).outerHeight();
		var $fluid_inner = 0;
		var $full_height = $(window).outerHeight();
		var $full_inner = 0;
		var $simplebar_height = 0;
		var $simplebar_inner = 0;

		if($('.fluid-card').length > 0){

			if($('.fluid-card .card-head').length > 0) $fluid_inner = $fluid_inner + $('.fluid-card .card-head').outerHeight();
			if($('.fluid-card .card-body').length > 0) $fluid_inner = $fluid_inner + $('.fluid-card .card-body').outerHeight();
			if($('.fluid-card .card-foot').length > 0) $fluid_inner = $fluid_inner + $('.fluid-card .card-foot').outerHeight();

			if($('#header').length > 0) $fluid_height = $fluid_height - $('#header').outerHeight();
			if($('#container').length > 0) $fluid_height = $fluid_height - 48;
			if($('.page-header').length > 0) $fluid_height = $fluid_height - $('.page-header').outerHeight();
			if($('.inset-card').length > 0) $fluid_height = $fluid_height - $('.inset-card').outerHeight();
			if($('.fixed-card').length > 0) $fluid_height = $fluid_height - $('.fixed-card').outerHeight();
			if($('#mainBanner').length > 0) $fluid_height = $fluid_height - $('#mainBanner').outerHeight();
						
			if($('#container .card').length > 1){
				$fluid_height = $fluid_height - 24;
			}
		
			$('.fluid-card').height($fluid_height - 2);
			$('.fluid-card').css('min-height', $fluid_inner);

		}

		if($('.schedule-simplebar').length > 0){

			var $simplebar_max = 0;
			var $simplebar_min = 0;

			$('.schedule-card').height($fluid_height - 2);
			$('.schedule-card').css('min-height', $fluid_inner);

			if($('.schedule-card .card-head').length > 0) $simplebar_max = $fluid_height - $('.schedule-card .card-head').outerHeight() - 40;
			if($('.schedule-card .calendar-head').length > 0) $simplebar_max = $simplebar_max - $('.schedule-card .calendar-head').outerHeight();
			
			$('.schedule-simplebar').css('max-height', $simplebar_max);

		}

		if($('.full-card').length > 0){

			if($('.full-card .card-head').length > 0) $full_inner = $full_inner + $('.full-card .card-head').outerHeight();
			if($('.full-card .card-body').length > 0) $full_inner = $full_inner + $('.full-card .card-body').outerHeight();
			if($('.full-card .card-foot').length > 0) $full_inner = $full_inner + $('.full-card .card-foot').outerHeight();

			if($('#header').length > 0) $full_height = $full_height - $('#header').outerHeight();
			if($('#container').length > 0) $full_height = $full_height - 48;
		
			$('.full-card').height($full_height - 2);
			$('.full-card').css('min-height', $full_inner);
		}

	}

});
