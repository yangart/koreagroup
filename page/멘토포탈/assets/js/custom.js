document.addEventListener('DOMContentLoaded', function() {
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
	$('.input-daterange').datepicker({
		format: "yyyy-mm-dd",	
		autoclose : true,	
		datesDisabled : ['2024-06-06','2024-06-26'],
		daysOfWeekDisabled : [0,6],	
		todayHighlight : true,
		language : "ko"	
	});
	
	$('#selectToday').click(function(){
        // 오늘 날짜를 가져와서 시작일과 종료일 input에 설정
        var today = new Date();
        $('#startDate').datepicker('setDate', today);
        $('#endDate').datepicker('setDate', today);
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

	// var table = document.querySelector('.table-custom-width');
    // var colgroup = table.querySelector('colgroup');
    
    // colgroup.querySelectorAll('col').forEach(function(col, index) {
    //     var width = col.style.width;
    //     table.querySelectorAll(`td:nth-child(${index + 1}), th:nth-child(${index + 1})`).forEach(function(cell) {
            
	// 		if(width == "auto") {
	// 			cell.style.flex = 1;
	// 		} else {
	// 			cell.style.width = width;
    //             cell.style.flex = 'unset';
	// 		}
    //     });
    // });
});
