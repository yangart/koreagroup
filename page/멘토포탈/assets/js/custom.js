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
	
	$(".modal-side-toggle").on('click', function(){
        if($(this).parents('.modal-body').hasClass('expanded')){
			$(this).parents('.modal-body').removeClass('expanded');
			return false;
		}else{
			$(this).parents('.modal-body').addClass('expanded');
			return false;
		}
	});
	/* 모달 2개 이상일 때 */
	$(document).on('hidden.bs.modal', '.modal', function () {
		$('.modal:visible').length && $(document.body).addClass('modal-open');
	});
	$('.form-datepicker').datepicker({
		format: "yyyy-mm-dd",	
		autoclose : true,	
		datesDisabled : ['2024-06-06','2024-06-26'],
		daysOfWeekDisabled : [0,6],	
		todayHighlight : true,
		language : "ko"					
	});
	
	// fluidAutoHeight();
	// $(window).resize(fluidAutoHeight);
	// function fluidAutoHeight(){
	// 	var $fluid_height = $(window).outerHeight();
	// 	var $fluid_inner = 0;
	// 	if($('.fluid-card').length > 0){
	// 		// if($('.fluid-card .card-head').length > 0) $fluid_inner = $fluid_inner + $('.fluid-card .card-head').outerHeight();
	// 		// if($('.fluid-card .card-body').length > 0) $fluid_inner = $fluid_inner + $('.fluid-card .card-body').outerHeight();
	// 		// if($('.fluid-card .card-foot').length > 0) $fluid_inner = $fluid_inner + $('.fluid-card .card-foot').outerHeight();

	// 		// if($('.page-header').length > 0) $fluid_height = $fluid_height - $('.page-header').outerHeight();
	// 		// if($('.page-footer').length > 0) $fluid_height = $fluid_height - $('.page-footer').outerHeight();
	// 		// if($('.page-content-title').length > 0) $fluid_height = $fluid_height - $('.page-content-title').outerHeight();			
	// 		// if($('.card-l1').length > 0) $fluid_height = $fluid_height - $('.card-l1').outerHeight() - 24;
	// 		// if($('.page-content').length > 0) $fluid_height = $fluid_height - 36;
		
	// 		// $('.fluid-card').height($fluid_height - 2);
	// 		// $('.fluid-card').css('min-height', $fluid_inner);
	// 	}
	// 	if($('.card-l1').length > 0){
	// 		$('.main-content').addClass("onPageSchedule");
	// 	}
	// }

	// 테이블 바디 스크롤 : 컬럼 너비를 colgroup에서 가져오기 위함
	var tables = document.querySelectorAll('table');
	tables.forEach(function(table, index) {
		// Get the number of columns in the current table
		var tableColumns = table.rows[0].cells.length;
		
		// Set the Sass variable value dynamically for each table
		document.documentElement.style.setProperty('--table-columns-' + (index + 1), tableColumns);
	  });
});
