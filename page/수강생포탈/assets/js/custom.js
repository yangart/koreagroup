document.addEventListener('DOMContentLoaded', function() {
	// Scroll Back Top Button
	// var toTop = document.getElementById("backToTop");
	// toTop.addEventListener("click", backToTop);
	// function backToTop() {
	// 	document.body.scrollTop = 0;
	// 	document.documentElement.scrollTop = 0;
	// }

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
});


function openMoAside(event){
	var btn = event.currentTarget;
    var menu = btn.querySelector('.m-menu');
    var menuAside = document.querySelector('.m-menu-aside');
    
    if (menu) {
        menu.classList.toggle('open');
    }
	if (menuAside) {
        menuAside.classList.toggle('open');
    }
}