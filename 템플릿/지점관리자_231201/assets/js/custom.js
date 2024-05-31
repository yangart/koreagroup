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


});
